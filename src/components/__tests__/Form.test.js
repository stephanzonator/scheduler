import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form"

//fireEvent.click(getByText("Save"));

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Lydia Miller-Jones",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  it("renders without crashing", () => {
    // console.log("donut", interviewers[0]["name"]);
    render(<Form interviewers={interviewers} interviewer={interviewers[0]} name={interviewers[0]["name"]}/>);
  });
  

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} interviewer={interviewers[0]}/>
    );   
    expect(getByPlaceholderText("Enter name here")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" interviewer={interviewers[0]} />
    );
    
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
  
  // it("validates that the student name is not blank", () => {
  //   /* 1. validation is shown */
  //   expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
  //   /* 2. onSave is not called */
  //   expect(onSave).not.toHaveBeenCalled();
  // });
  
  // it("calls onSave function when the name is defined", () => {
  //   /* 3. validation is not shown */
  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
  //   /* 4. onSave is called once*/
  //   expect(onSave).toHaveBeenCalledTimes(1);
  
  //   /* 5. onSave is called with the correct arguments */
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  // });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
  
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
  
    /* 3. Click the save button */


    const mockEvent = jest.fn();
    const { getByText } = render(
      <Form onSave={mockEvent} interviewers={interviewers} name="" interviewer={interviewers[0]} />
    );
    fireEvent.click(getByText("Save"));  
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
  
  
});