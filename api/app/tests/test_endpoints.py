from fastapi.testclient import TestClient
from json import loads

from ..main import app

client = TestClient(app)


def test_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_validate_endpoint():
    # test with invalid json resume
    response = client.post("/validate", json={"This is not a valid json resume": "string"})
    assert response.status_code == 422

    # test with valid json resume
    with open("sample.resume.json", encoding="utf8") as f:
        json_string = f.read()
        json_data = loads(json_string)

    response = client.post("/validate", json=json_data)
    assert response.status_code == 200
    assert response.json() == {"message": "Valid Resume"}

def test_resume_endpoint():
    # test with invalid json resume
    response = client.post("/resume", json={"This is not a valid json resume": "string"})
    assert response.status_code == 422

    # test with valid json resume
    with open("sample.resume.json", encoding="utf8") as f:
        json_string = f.read()
        json_data = loads(json_string)

    response = client.post("/resume", json=json_data)
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"

    response = client.post("/resume?theme=1", json=json_data)
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"

    response = client.post("/resume?theme=2", json=json_data)
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"

    response = client.post("/resume?theme=3", json=json_data)
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"


def test_resume_custom_endpoint():
    # test with invalid json resume
    response = client.post("/resume/custom", json={"resume_schema_object": {"This is not a valid json resume": "string"}, "theme_json": {"This is not a valid theme json": "string"}})
    assert response.status_code == 422

    # test with valid json resume and invalid theme json
    with open("sample.resume.json", encoding="utf8") as f:
        json_string = f.read()
        json_data = loads(json_string)

    response = client.post("/resume/custom", json={"resume_schema_object": json_data, "theme_json": {"This is not a valid theme json": "string"}})
    assert response.status_code == 422

    # test with invalid json resume and valid theme json
    with open("themes/default.json", encoding="utf8") as f:
        json_string = f.read()
        json_data = loads(json_string)

    response = client.post("/resume/custom", json={"resume_schema_object": {"This is not a valid json resume": "string"}, "theme_json": json_data})
    assert response.status_code == 422

    # test with valid json resume and valid theme json

    with open("sample.resume.json", encoding="utf8") as f:
        json_string = f.read()
        json_data = loads(json_string)

    with open("themes/default.json", encoding="utf8") as f:
        json_string = f.read()
        json_data_theme = loads(json_string)

    response = client.post("/resume/custom", json={"resume_schema_object": json_data, "theme_json": json_data_theme})
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
    

    # test with another theme
    with open("themes/default2.json", encoding="utf8") as f:
        json_string = f.read()
        json_data_theme = loads(json_string)

    response = client.post("/resume/custom", json={"resume_schema_object": json_data, "theme_json": json_data_theme})
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
