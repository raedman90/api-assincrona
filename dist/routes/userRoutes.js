"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
router.post('/', UserController_1.createUser);
router.get('/', UserController_1.listUsers);
router.get('/queue/status', UserController_1.getQueueStatus);
exports.default = router;
