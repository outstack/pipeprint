# Pipeprint

This is a proof-of-concept repo for now, so there is not much documentation just yet. 

## How to build / run

    docker build -t outstack/pipeprint .
    docker run -e PIPEPRINT_ENGINE_CONFIG='{"twig": "http://twig", "mjml": "http://mjml"}' outstack/pipeprint
