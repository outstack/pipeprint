// Require the framework and instantiate it
const fastify = require('fastify')();
const axios = require('axios');

process.on('SIGINT', function() {
    process.exit();
});

const engines = JSON.parse(process.env.PIPEPRINT_ENGINE_CONFIG);

fastify.post('/render/pipeline', async function (request, reply) {
    let body = request.body;

    let stages = body.pipeline;

    let renderStage = async function(previousStageResult, stage) {
        let files = body.files;
        files['_previous'] = previousStageResult;
        let params = {
            files: files,
            template: stage.template || '_previous',
            parameters: body.parameters
        };
        return axios.post(
            engines[stage.engine] + "/render",
            params
        );
    };

    let previousStageResult = null;
    for (let index in stages) {

        try {
            previousStageResult = (await renderStage(previousStageResult, stages[index])).data;
        } catch (e) {
            reply
                .code(500)
                .type('application/json')
                .send({
                    error: 'pipeline_failed',
                    description: 'Failed at stage ' + index + ': ' + e.message
                });
        }
    }

    reply
        .code(200)
        .type('text/plain')
        .send(previousStageResult);

});

// Run the server!
fastify.listen(80, function (err) {
    if (err) throw err;
    console.log(`server listening on ${fastify.server.address().port}`)
});