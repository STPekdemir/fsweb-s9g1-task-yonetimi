import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskHookForm({ kisiler, submitFn }) {
  const notify = () => {
    toast("Task  eklendi.");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const onFormSubmit = (data) => {
    const newData = { ...data, id: nanoid(), status: "yapılacak" };
    submitFn(newData);
    console.log(data);
    reset();
    notify();
  };

  const validatePeople = (selectedPeople) => {
    if (selectedPeople.length > 3) {
      return "En fazla 3 kişi seçebilirsiniz";
    }
    return true;
  };
  return (
    <>
      <form className="taskForm" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="form-line">
          <label className="input-label" htmlFor="title">
            Başlık
          </label>
          <input
            className="input-text"
            id="title"
            name="title"
            type="text"
            {...register("title", {
              required: "Task başlığı yazmalısınız",
              minLength: {
                value: 3,
                message: "Task başlığı en az 3 karakter olmalı",
              },
            })}
          />

          <p className="input-error">{errors?.title?.message}</p>
        </div>

        <div className="form-line">
          <label className="input-label" htmlFor="description">
            Açıklama
          </label>
          <textarea
            className="input-textarea"
            rows="3"
            id="description"
            name="description"
            {...register("description", {
              required: "Task açıklaması yazmalısınız",
              minLength: {
                value: 10,
                message: "Task açıklaması en az 10 karakter olmalı",
              },
            })}
          ></textarea>
          <p className="input-error">{errors?.description?.message}</p>
        </div>

        <div className="form-line">
          <label className="input-label">İnsanlar</label>
          <div>
            {kisiler.map((p) => (
              <label className="input-checkbox" key={p}>
                <input
                  type="checkbox"
                  name="people"
                  value={p}
                  {...register("people", {
                    required: "Lütfen en az bir kişi seçin",
                    validate: (selectedPeople) =>
                      validatePeople(selectedPeople),
                  })}
                />
                {p}
              </label>
            ))}
          </div>
          <p className="input-error">{errors?.people?.message}</p>
        </div>

        <div className="form-line">
          <button className="submit-button" type="submit">
            Kaydet
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
