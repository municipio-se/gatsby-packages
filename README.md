# Municipio Gatsby Packages

This is the monorepo for all Gatsby packages related to
[Municipio](https://www.municipio.se/).

## Packages

All packages are inside the `/packages` directory

### `@municipio/gatsby-theme-basic`

A Gatsby theme for a basic setup of Municipio. It's dependent on
[`@whitespace/gatbsy-theme-wordpress-basic`](https://www.npmjs.com/package/@whitespace/gatsby-theme-wordpress-basic)
which handles the sourcing from Wordpress and provides some basic components and
layout. The `@municipio/gatsby-theme-basic` package adds components for the core
Modularity modules.

### `@municipio/gatsby-theme-intranet`

A Gatsby theme adapted for intranets. It comes with more opinionated layout and
styling as well as an SSO integration with Wordpress.

## Examples

The `/examples` directory contains demo apps. In this case, they are actually
submodules linking to the two Gatsby starters – one for each theme.

## Contributing

If your want to make a pull request, fork the repo and create a branch based on
`main` but the name must start with `feature/`. Commit messages should follow
[Conventional Commits](https://www.conventionalcommits.org/). Publishing is done
via [Lerna](https://lerna.js.org/).
