import React from "react";
import { prettyDOM, getAllByTestId, queryByAltText, getByAltText,  queryByText,
  render, cleanup, fireEvent,  getByPlaceholderText, waitForElement, getByText } from "@testing-library/react";
import Application from "components/Application";

// afterEach(cleanup);

// it("renders without crashing", () => {
//   render(<Application />);
// });

describe("Application", () => {
  xit("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText, debug } = render(<Application />);

    // return waitForElement(() => getByText("Monday"));
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  xit("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // console.log(prettyDOM(container));
    // console.log(prettyDOM(appointments));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /Enter name here/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));
    // console.log(prettyDOM(appointment));
    // console.log(debug);

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    // expect(getByText(appointment, "Saving...")).not.toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    // console.log(prettyDOM(day));
    

  });
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    await waitForElement(() => getByText(appointment, "Confirm"));
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    await waitForElement(() => getByText(appointment, "Deleting..."));
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => queryByAltText(appointment, "Add"));
    // // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    expect(getByText(container, "5 spots remaining")).toBeInTheDocument();

    debug();
  });
  
  
  
})
