# Pipeprint

**This is a proof-of-concept repo for now, so there is not much documentation just yet. It's a spin-off project from [Enveloper](https://github.com/outstack/enveloper). To see how's it's useful, and why it exists, [see here](https://github.com/outstack/enveloper/blob/master/docs/04-advanced-templating.md). To be updated when on new changes and docs, follow along on [twitter](https://twitter.com/_outstack).**

## How to build / run

    docker build -t outstack/pipeprint .
    docker run -e PIPEPRINT_ENGINE_CONFIG='{"twig": "http://twig", "mjml": "http://mjml"}' outstack/pipeprint
