import "../styles/question.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { QUESTIONS_SERVICE } from "../Services";

// This should be dynamic routing and go by question ID
export const Question = () => {

  const navigate = useNavigate();
  const params = useParams();

  const [isAdmin, setIsAdmin] = useState(true);

  const [category, setCategory] = useState([]);
  const categoryValues = [{value: "Algorithms", label: "Algorithms"}, {value: "Arrays", label: "Arrays"}, 
    {value: "Bit Manipulation", label: "Bit Manipulation"}, {value: "Brainteaser", label: "Brainteaser" }, 
    {value: "Databases", label: "Databases"}, {value: "Data Structures", label: "Data Structures"},
    {value: "Recursion", label: "Recursion"}, {value: "Strings", label: "Strings"}
  ]
  const [complexity, setComplexity] = useState("");
  const complexityValues = [{value: "Easy", label: "Easy"}, {value: "Medium", label: "Medium"}, {value: "Hard", label: "Hard"}];
  const [title, setTitle] = useState("");
  const [descriptionText, setDescriptionText] = useState("");

  const [createMode, setCreateMode] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);

  const [webLink, setWebLink] = useState("");

  const changeEditMode = (e) => {
    setHasEdited(false);
    setEditMode(prevState => !prevState);
  }

  const changeTitleText = (e) => {
    setHasEdited(true);
    setTitle(e.target.value);
  }

  const changeDescriptionText = (e) => {
    setHasEdited(true);
    setDescriptionText(e.target.value);
  }

  const createCategoryArray = (categories) => {
    var output = [];
    for (var topic of categories) {
      output.push({label: topic, value: topic});
    }
    setCategory(output);
  }

  const revertCategoryArray = (categories) => {
    var output = [];
    for (var topic of categories) {
      output.push(topic.value);
    }
    return output;
  }

  const saveQuestion = async (e) => {
    try {
      const response = await axios.patch(`${QUESTIONS_SERVICE}/questions/${params.id}`, {
        title: title,
        description: descriptionText,
        category: revertCategoryArray(category),
        complexity: complexity,
        web_link: webLink,
        question_id: params.id
      })
      if (response.status === 400 || response.status === 404) {
        alert("Failed to save question!");
      } else {
        getQuestionData(params.id);
        alert("Successfully updated!");
      }
    } catch(error) {
      if (error.response.data.code === 11000) {
        //duplicate
        alert("Question titles must be unique!");
      } else {
        alert("An error occured!");
      }
    }
  }

  const cancelChanges = (e) => {
    getQuestionData(params.id);
  }

  const getQuestionData = async (id) => {
    setHasEdited(false);
    setEditMode(false);
    try {
      const response = await axios.get(`${QUESTIONS_SERVICE}/questions/${id}`);
      if (response.status === 404 || response.status === 500) {
        //404 not found
        navigate("/*")
      }
      createCategoryArray(response.data.category);
      setComplexity(response.data.complexity);
      setTitle(response.data.title);
      setDescriptionText(response.data.description);
      setWebLink(response.data.web_link);
    } catch (error) {
      navigate("/*")
    }
  }

  const createQuestion = async (e) => {
    if ((Array.isArray(category) && category.length === 0) || complexity.trim() === "" || title.trim() === "" || 
      descriptionText.trim() === "") {
      alert("Some fields are empty!");
    } else {
      if (descriptionText.length > 10) {
        try {
          const response = await axios.post(`${QUESTIONS_SERVICE}/questions`, {
            complexity: complexity,
            category: revertCategoryArray(category),
            title: title,
            description: descriptionText,
            web_link: "www.google.com"
          });
          if (response.status === 201) {
            alert("Successfully created question!");
            //console.log(response.data);
            navigate(`/questions/${response.data.question_id}`);
          } else {
            alert("Unable to create question :(");
          }
        } catch (error) {
          if (error.response.data.code === 11000) {
            //duplicate
            alert("Question titles must be unique!");
          } else {
            alert("An error occured!");
          }
        }
      } else {
        alert("Your description is too short!");
      }
    }
  }

  const handleHomeButton = (e) => {
    navigate("/home");
  }

  useEffect(() => {
    if (params.id === "new") {
      //new question
      setEditMode(true);
      setCreateMode(true);
    } else {
      getQuestionData(params.id);
    }
  }, [params])

  return(
    <div className="question-page">
      <div className="row1">
        <div>
          <Select className="basic-single" classNamePrefix="complexity" value={complexityValues.find(option => option.value === complexity)}
            onChange={selectedOption => {setHasEdited(true); setComplexity(selectedOption.value)}} 
            isDisabled={!editMode} options={complexityValues} menuPlacement="auto" />
        </div>
        <div>
          <Select className="basic-multi-select" isMulti value={category} classNamePrefix="category"
            onChange={selected => {setCategory(selected); setHasEdited(true)}}
            isDisabled={!editMode} options={categoryValues} />
        </div>
        <FontAwesomeIcon icon={faHome} style={{fontSize: "32px", color: "#FCFCBD", cursor: "pointer"}} onClick={handleHomeButton}>        
        </FontAwesomeIcon>
      </div>
      <div className="row2">
        <textarea className="question-title" type="text" value={title} disabled={!editMode} 
          spellCheck={false} onChange={changeTitleText}>
        </textarea>
      </div>
      <div className="row3">
        <textarea className="description-component" type="text" value={descriptionText} disabled={!editMode}
          spellCheck={false} onChange={changeDescriptionText}>
        </textarea>
      </div>
      <div className="row4">
        {isAdmin ? <div className="button-display">
          {createMode ? <button className="edit-button" onClick={createQuestion}>Create</button> : null}
          {!createMode ? (editMode ? (hasEdited ? <button className="edit-button" onClick={saveQuestion}>Save</button> : null)  
            : <button className="edit-button" onClick={changeEditMode}>Edit</button>)
            : null}
          {createMode ? null : (editMode ? <button className="edit-button" onClick={cancelChanges}>Cancel</button> : null)}
        </div> : null}
      </div>
    </div>
  );
}

