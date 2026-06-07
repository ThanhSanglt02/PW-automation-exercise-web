# Repository Guidelines

## Project Structure & Module Organization

This repository is organized as an AI-assisted QA support workspace. Keep source files under `src/`; the current tracked source file is `src/my_script .py`. Store agent prompts in `.agents/prompts/`, static project knowledge in `.agents/knowledge/`, and generated agent outputs in `.agents/output/` when needed. The root `README.md` describes the intended AIDD workflow and should be reviewed before larger changes.

## Testing Guidelines

Before genarating test or anything skill, you need to read all knowleadge from `.agents/knowledge/`

## Agent-Specific Instructions

Before editing code or prompts, read `README.md`, relevant files in `.agents/knowledge/testing-theory.md`. Do not invent business rules that are absent from specs; document assumptions or ask for clarification when behavior is ambiguous.
