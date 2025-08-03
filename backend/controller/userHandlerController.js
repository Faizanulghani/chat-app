const conversationModel = require("../models/conversationModel");
const userModel = require("../models/userModel");

exports.getUserBySearch = async (req, res) => {
  try {
    const search = req.query.search || "";
    const currentUserId = req.user._id;
    const users = await userModel
      .find({
        $and: [
          {
            $or: [
              { username: { $regex: ".*" + search + ".*", $options: "i" } },
              { fullname: { $regex: ".*" + search + ".*", $options: "i" } },
            ],
          },
          {
            _id: { $ne: currentUserId },
          },
        ],
      })
      .select("-password")
      .select("email");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCurrentChatters = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const currentChatters = await conversationModel
      .find({ participants: currentUserId })
      .sort({ updatedAt: -1 });

    if (!currentChatters || currentChatters.length === 0) {
      return res.status(200).json([]);
    }

    const participantsIds = currentChatters.reduce((ids, conversation) => {
      const otherParticipants = conversation.participants.filter(
        (id) => id.toString() !== currentUserId.toString()
      );
      return [...ids, ...otherParticipants];
    }, []);

    const uniqueParticipantIds = [
      ...new Set(participantsIds.map((id) => id.toString())),
    ];

    const users = await userModel
      .find({ _id: { $in: uniqueParticipantIds } })
      .select("-password -email");

    const sortedUsers = uniqueParticipantIds.map((id) =>
      users.find((u) => u._id.toString() === id)
    );

    res.json({ success: true, users: sortedUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
