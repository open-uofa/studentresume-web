const map = {
    basics: "Personal Information",
    work: "Work Experience",
    volunteer: "Volunteer Experience",
    education: "Education",
    awards: "Awards",
    publications: "Publications",
    skills: "Skills",
    languages: "Languages",
    interests: "Interests",
    references: "References",
    projects: "Projects"
}

const getSectionNameByKeyword = (keyword) => {
    return map[keyword];
}

const getSectionName = (input) => {
    return Object.keys(input)[0];
}

const HintMap = {
    "basics": "Please fill out your basic information",
    "work": "Please fill out your work experience",
    "volunteer": "Please fill out your volunteer experience",
    "education": "Please fill out your education",
    "awards": "Please fill out your awards",
    "publications": "Please fill out your publications",

    "basics_name": "Please fill out your name",
    "basics_label": "Ex. Software Engineer",
    "basics_email": "Please fill out your email",
    "basics_phone": "Please fill out your phone number",
    "basics_url": "Enter your personal website link",
    "basics_summary": "Include your top achievements, unique skills and expertise, and relevant work experience.",
    "basics_location": "Please fill out your location",

    "education_institution": "Ex. University of Alberta",
    "education_url": "https://www.ualberta.ca/index.html",
    "education_area": "Ex. Electrical Engineering",
    "education_studyType": "Bachelor's, Masters, PhD",
    "education_score": "Please fill out your GPA",
    "education_courses": "Please fill out your relevent courses",

    "skills_name": "Enter the name of the skill",
    "skills_level": "Enter the level of the skill",
    "skills_keywords": "Enter keywords about the skill",

    "work_name": "Enter the name of the company",
    "work_position": "Ex. CEO/Intern",
    "work_url": "Enter the url of company's website",
    "work_summary": "Enter a summary of this company",
    "work_highlights": "Include your top achievements, unique skills and expertise during your job.",

    "volunteer_organization": "Enter the name of the organization",
    "volunteer_position": "Enter the position you had",
    "volunteer_url": "Enter the url of volunteering website",
    "volunteer_summary": "Ex. Global movement of free coding clubs for young people.",
    "volunteer_highlights": "Include your top achievements, unique skills and expertise during your job.",

    "awards_title": "Enter the title of the award",
    "awards_awarder": "Enter the awarder's name",
    "awards_summary": "Enter a summary of the award",

    "publications_name": "Enter the name of the publication",
    "publications_publisher": "Enter the name of the publishers",
    "publications_url": "eg. http://en.wikipedia.org/wiki/Silicon_Valley_(TV_series)",
    "publications_summary": "Enter a summary of the publication",

    "projects_name": "Enter the name of the project",
    "projects_description": "Enter a short description of the project",
    "projects_highlights": "Enter the key highlights of the project",
    "projects_keywords": "Enter keywords about the project",
    "projects_url": "Enter a link to your project",
    "projects_roles": "Enter your roles in the project",

    // ...
}

const getHint = (key) => {
    return HintMap[key];
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const field_basic = ["name", "email", "phone", "url", "summary", "location", "profiles"]; //profile and location are list
const field_education = ["institution", "url", "area", "studyType", "startDate", "endDate", "score"];
const field_skills = ["name", "level", "keywords"]; //keywords is list
const field_work = ["name", "location", "description", "url", "position", "startDate", "endDate", "summary", "highlights"];
const field_volunteer = ["organization", "position", "url", "startDate", "endDate", "summary", "highlights"];
const field_awards = ["title", "date", "awarder", "summary"];
const field_publications = ["name", "publisher", "releaseDate", "url", "summary"];
const field_project = ["name", "description", "highlights", "keywords", "startDate", "endDate", "url", "roles", "entity", "type"]; //keywords is list

const mand_sections = ["basics", "education", "skills"];
const all_sections = ["basics", "education", "skills", "work", "volunteer", "awards", "publications", "projects", "languages", "interests", "references"];
const selected_sections = new Set([]);

const checkRequiredField = (section, field) => {
    if (section === "basics") {
        if (field === "name" || field === "email" || field === "phone" || field === "summary" || field === "url" || field === "location") {
            return true;
        }

    } else if (section === "education") {
        if (field === "institution" || field === "url" || field === "area" || field === "studyType") {
            return true;
        }

    } else if (section === "skills") {
        if (field === "name" || field === "level" || field === "keywords") {
            return true;
        }
    } else if (section === "work") {
        if (field === "name" || field === "description" || field === "url" || field === "position") {
            return true;
        }
    } else if (section === "volunteer") {
        if (field === "organization" || field === "position" || field === "url") {
            return true;
        }
    } else if (section === "awards") {
        if (field === "title" || field === "date" || field === "awarder" || field === "summary") {
            return true;
        }
    } else if (section === "publications") {
        if (field === "name" || field === "publisher" || field === "releaseDate" || field === "url" || field === "summary") {
            return true;
        }
    } else if (section === "projects") {
        if (field === "name" || field === "description" || field === "highlights" || field === "keywords" || field === "url" || field === "roles") {
            return true;
        }
    }

}

const checkSectionComplete = (sectionName, sectionData, onUpdateSectionComplete) => {
    let isComplete = true;
    switch (sectionName) {
        case "basics":
            for (let i = 0; i < field_basic.length; i++) {
                if (sectionData[field_basic[i]] === "" || sectionData[field_basic[i]] === []) {
                    isComplete = false;
                    break;
                }
            }
            break;
        case "education":
            for (let i = 0; i < field_education.length; i++) {
                for (let j = 0; j < sectionData.length; j++) {
                    if (sectionData[j][field_education[i]] === "") {
                        isComplete = false;
                        break;
                    }
                }
            }
            break;
        case "skills":
            for (let i = 0; i < field_skills.length; i++) {
                for (let j = 0; j < sectionData.length; j++) {
                    if (sectionData[j][field_skills[i]] === "" || sectionData[j][field_skills[i]] === []) {
                        isComplete = false;
                        break;
                    }
                }
            }
            break;
        case "work":
            for (let i = 0; i < field_work.length; i++) {
                for (let j = 0; j < sectionData.length; j++) {
                    if (sectionData[j][field_work[i]] === "") {
                        isComplete = false;
                        break;
                    }
                }
            }
            break;
        case "volunteer":
            for (let i = 0; i < field_volunteer.length; i++) {
                for (let j = 0; j < sectionData.length; j++) {
                    if (sectionData[j][field_volunteer[i]] === "") {
                        isComplete = false;
                        break;
                    }
                }
            }
            break;
        case "awards":
            for (let i = 0; i < field_awards.length; i++) {
                for (let j = 0; j < sectionData.length; j++) {
                    if (sectionData[j][field_awards[i]] === "") {
                        isComplete = false;
                        break;
                    }
                }
            }
            break;
        case "publications":
            for (let i = 0; i < field_publications.length; i++) {
                for (let j = 0; j < sectionData.length; j++) {
                    if (sectionData[j][field_publications[i]] === "") {
                        isComplete = false;
                        break;
                    }
                }
            }
            break;
        case "projects":
            for (let i = 0; i < field_project.length; i++) {
                for (let j = 0; j < sectionData.length; j++) {
                    if (sectionData[j][field_project[i]] === "" || sectionData[j][field_project[i]] === []) {
                        isComplete = false;
                        break;
                    }
                }
            }
            break;
        default:
            break;
    }
    onUpdateSectionComplete(sectionName, isComplete);
}

export { getSectionNameByKeyword, getSectionName, getHint, checkSectionComplete, checkRequiredField, mand_sections, all_sections, selected_sections };