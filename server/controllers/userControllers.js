import User from "../models/userModel.js";
import { getAuth } from "@clerk/express";

const saveUser = async (req, res) => {
    try {
        const { name, email, userId } = req.body;

        if (!name || !email || !userId) {
            return res.status(400).json({ message: "Missing fields" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                clerkId: userId,
                role: "buyer"
            });
        }

        res.status(200).json({ message: "User saved", user });
    } catch (error) {
        console.error("Error in saveUser:", error);
        res.json({ message: "Internal Server Error", error: error.message });
    }
};

const becameSeller = async (req, res) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = "seller";
        await user.save();

        res.status(200).json({ message: "User role updated to seller", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const fetchSeller = async (req, res) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "seller") {
            return res.status(403).json({ message: "User is not a seller" });
        }

        res.status(200).json({ message: "User is a seller", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { saveUser, becameSeller, fetchSeller };


