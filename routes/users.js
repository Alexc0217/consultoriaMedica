import express from "express";

import { getUsers, createUser, form } from "../controllers/users.js";

const router = express.Router();

router.get('/', getUsers);
router.post('/user/create', createUser);

export default router;