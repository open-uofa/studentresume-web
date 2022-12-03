from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from json import loads
from studentresume.resume import Resume
from studentresume.json_validator import is_valid_resume, is_valid_theme
from studentresume.run import get_file

try:
    from .model import ResumeSchema
    from .theme_model import ThemeModel
except ImportError:
    from model import ResumeSchema
    from theme_model import ThemeModel

app = FastAPI()


# origins = [
#     "*",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=False,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.post("/validate")
def resume(resume_schema_object: ResumeSchema):

    json_string: str = resume_schema_object.json(exclude_none=True, by_alias=True)
    print(json_string)
    resume=Resume(False)
    if is_valid_resume(json_string) and resume.required_fields_worker(loads(json_string)) == True:
        return {"message": "Valid Resume"}

    return {"message": "Invalid Resume"}


@app.post("/resume")
def resume(resume_schema_object: ResumeSchema, theme: int = 1):
    # theme is a query parameter
    # set the theme by calling the api endpoint with this url
    # http://url_here/resume?theme=2
    # note that this is optional, and that using the previous http://url_here/resume will use the default theme
    resume = Resume()
    if theme == 1:
        theme = loads(get_file("themes/default.json"))
    elif theme == 2:
        theme = loads(get_file("themes/default2.json"))
    elif theme == 3:
        theme = loads(get_file("themes/default3.json"))
    else:
        # What to do if theme is greater than 3 or less than 1?
        # Just use theme 1 for now
        theme = loads(get_file("themes/default.json"))

    resume.apply_theme(theme)

    json_string: str = resume_schema_object.json(exclude_none=True, by_alias=True)
    print(json_string)

    if is_valid_resume(json_string):
        json_data = loads(json_string)
        try:
            bytes = resume.generate_resume(json_data)
        except Exception as e:
            print(e)
            return {"message": "Error generating resume", "error": str(e)}
        headers = {'Content-Disposition': 'inline; filename="resume.pdf"'}
        return Response(content=bytes, media_type="application/pdf", headers=headers)

    return {"message": "Invalid Resume"}


# Endpoint for resume with custom theme json
@app.post("/resume/custom")
def resume(resume_schema_object: ResumeSchema, theme_json: ThemeModel):
    # USAGE EXAMPLE:
    # see endpoint tests for more examples
    # response = client.post("/resume/custom", json={"resume_schema_object": json_data, "theme_json": json_data_theme})
    # this is python code, but the idea is the same, the json must have this format

    if theme_json == "":
        return {"message": "No theme json provided"}

    resume = Resume()
    theme_string: str = theme_json.json(exclude_none=True, by_alias=True)
    print(theme_string)
    resume.apply_theme(loads(theme_string))

    json_string: str = resume_schema_object.json(exclude_none=True, by_alias=True)
    print(json_string)

    if not is_valid_resume(json_string):
        return {"message": "Invalid Resume"}

    if not is_valid_theme(theme_string):
        return {"message": "Invalid Theme"}


    json_data = loads(json_string)
    try:
        bytes = resume.generate_resume(json_data)
    except Exception as e:
        print(e)
        return {"message": "Error generating resume", "error": str(e)}
    headers = {'Content-Disposition': 'inline; filename="resume.pdf"'}
    return Response(content=bytes, media_type="application/pdf", headers=headers)
