import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calculator() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="grid grid-cols-2 gap-8 bg-white shadow-xl border border-slate-200 rounded-md p-6 ">
      <div className="pr-10">
        <h2 className="font-extrabold text-3xl mb-4">Easy Date Calculator</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
          officia ducimus, odio inventore, beatae ut aperiam eius dolore
          perferendis voluptate qui reprehenderit iste laboriosam consequuntur
          officiis cum. Laudantium, quaerat neque?
        </p>
        <div className="my-4"></div>
      </div>
      <div>
        <label>Select a date</label>
        <DatePicker
          wrapperClassName="picker-wrapper"
          name="start"
          className="picker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <span>
          {startDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
        </span>
        <label>Do you want to add or subtract time?</label>
        <br />

        <div className="flex gap-4 justify-evenly flex-wrap">
          <div className=" flex-grow  whitespace-nowrap  flex-shrink-0 basis-[calc(50% - 1rem)]">
            <input
              className="appearance-none peer sr-only"
              type="radio"
              name="method"
              id="add"
            />{" "}
            <label
              className="w-full cursor-pointer transition block  text-center font-bold text-lg uppercase peer-checked:ring-neutral peer-checked:shadow-lg peer-checked:ring-4 px-10 py-3 rounded bg-indigo-500 text-white"
              for="add"
            >
              Add
            </label>
          </div>
          <div className="flex-grow whitespace-nowrap flex-shrink-0  basis-[calc(50% - 1rem)]">
            <input
              className="appearance-none peer sr-only"
              type="radio"
              name="method"
              id="subtract"
            />{" "}
            <label
              className="w-full  cursor-pointer transition block text-center font-bold text-lg uppercase peer-checked:ring-neutral peer-checked:shadow-lg peer-checked:ring-4 px-10 py-3 rounded bg-slate-400 text-white"
              for="subtract"
            >
              Subtract
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
