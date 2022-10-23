import Task from "../models/Task.js";
import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(3).max(200).required(),
  completed: Joi.boolean(),
});

//get all tasks
export const getTasks = async (req, res) => {
  try {
    const task = await Task.find();
    return res.json({
      ok: true,
      task,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

//create task
export const createTask = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const { error } = schema.validate(req.body);

    if (error)
      return res
        .status(400)
        .json({ ok: false, message: error.details[0].message });

    //generate random color
    let letters = "0123456789ABCDEF";
    let background = "#";
    for (let i = 0; i < 6; i++) {
      background += letters[Math.floor(Math.random() * 16)];
    }

    const newTask = new Task({ title, description, completed, background });

    //guardar en db
    await newTask.save();

    return res.json({ ok: true, newTask });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

//delete task
export const deleteTask = async (req, res) => {
  try {
    const taskDelete = await Task.findByIdAndDelete(req.params.id);
    if (!taskDelete)
      return res.status(404).json({ ok: false, msg: "item already deleted" });

    return res.status(202).json({
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update task
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.send(updatedTask);
  } catch (error) {
    return res.json.status(500).json({ ok: false });
  }
};

//get task by id
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ ok: false });

    return res.json({ ok: true, task });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

//toogle task
export const taskToggleCompleted = async (req, res) => {
  try {
    let { id } = req.params;

    const task = await Task.findById(id);

    task.completed = !task.completed;

    await task.save();

    return res.send(task);
  } catch (error) {
    return res.json.status(500).json({ ok: false });
  }
};
