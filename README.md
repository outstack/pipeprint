# Pipeprint

## Getting started

Pipeprint has two modes of operation, as an HTTP server, and as a command line tool. 
Both of these rely on docker to simplify setup, running and updating. 

Let's create a few templates to get started. For this simple example, we'll create a PDF
using a template built with Twig. The HTML will be generated from Markdown.

Here is `invoice.pdf.md.twig`:
    
    # Sales invoice. Order no {{ order.number }}
    
    | Item | Price | Qty | Total |
    | ---- | ----- | --- | ----- | 
    {% for item in order.items %}
        | {{ item.title }} | {{ item.price }} | {{ item.qty }} | {{ item.total }} |
    {% endfor %}


## Using the CLI

> This is in the design stage right now. The CLI does not yet exist! See [this issue](https://github.com/outstack/pipeprint/issues/2) for progress or to submit ideas.

## Using the HTTP server

Start the HTTP server:

    docker run \
        -e PIPEPRINT_ENGINE_CONFIG='{"markdown": "http://markdown", "mjml": "http://pdf"}' \
        outstack/pipeprint

The URLs in the `PIPEPRINT_ENGINE_CONFIG` are the URLs of the template engines we will request next. They must be 
available to the docker container at these addresses.

The HTTP server has a single endpoint, `/render/pipeline`. You `POST` to it with a JSON-encoded array like this:

    {
        'files': {
            'invoice.pdf.md.twig': '.. file contents'.
        ],
        'pipeline': [
            {'engine': 'markdown', 'template': 'invoice.pdf.md.twig' },
            {'engine': 'pdf'},
        ],
        'parameters': {
            "order": {
                "number": "14", 
                "items": [
                    {"title": "widget",   "price": "£5.00", "qty": 4, "total": "£20.00"}
                    {"title": "widget 2", "price": "£9.20", "qty": 2, "total": "£18.40"}
                ]
            }
    }

## Building a pipeprint compatible engine

For each stage in the pipeline, the engine (whose endpoint is retrieved from `PIPEPRINT_ENGINE_CONFIG`) will
be called with `files` and `parameters` as above.

Additionally, it will receive a `template` parameter indicating which of the files is the template to be
rendered. In the case that this is the first pipeline stage, this would be e.g. `invoice.pdf.twig`. In any following
stages, it would be `_previous` - a special file added to the list of files passed. 

See the [MJML engine](https://github.com/outstack/pipeprint-engine-mjml) for a JS example, or the [Twig engine](https://github.com/outstack/pipeprint-engine-twig) for a PHP example.