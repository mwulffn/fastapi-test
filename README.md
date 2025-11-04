# FastAPI Test

A minimal FastAPI hello world application.

## Requirements

- Python 3.11+
- [uv](https://github.com/astral-sh/uv) package manager

## Installation

The dependencies are already configured in `pyproject.toml`. To install:

```bash
uv sync
```

## Running the Application

Run the development server:

```bash
uv run uvicorn main:app --reload
```

The application will be available at `http://localhost:8000`.

## API Endpoints

- `GET /` - Returns a hello world message
- `GET /health` - Health check endpoint
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation (ReDoc)

## Example Usage

```bash
curl http://localhost:8000/
# {"message": "Hello World"}

curl http://localhost:8000/health
# {"status": "healthy"}
```
