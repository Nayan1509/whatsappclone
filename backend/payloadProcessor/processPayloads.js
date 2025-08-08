const fs = require("fs");
const path = require("path");
const Message = require("../models/Message");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("../config/db");

const processPayloads = async () => {
  await connectDB();
  console.log("✅ Connected to MongoDB");

  const dir = path.join(__dirname, "payloads");
  const files = fs.readdirSync(dir);

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const parsed = JSON.parse(raw);

      const entries = parsed?.metaData?.entry || [];

      for (const entry of entries) {
        const changes = entry?.changes || [];

        for (const change of changes) {
          const value = change?.value || {};

          // ✅ Handle new messages
          if (value?.messages) {
            const messages = value.messages || [];
            const contacts = value.contacts || [];
            const contact = contacts[0];
            const name = contact?.profile?.name || "Unknown";
            const wa_id = contact?.wa_id;

            for (const msg of messages) {
              const text = msg?.text?.body;
              const timestamp = msg?.timestamp
                ? new Date(Number(msg.timestamp) * 1000)
                : new Date();
              const meta_msg_id = msg?.id;
              const direction = msg?.from === wa_id ? "inbound" : "outbound";

              if (wa_id && text && meta_msg_id) {
                await Message.create({
                  wa_id,
                  name,
                  text,
                  timestamp,
                  direction,
                  status: "sent",
                  meta_msg_id,
                });
                console.log(`💬 Inserted message: ${text}`);
              }
            }
          }

          // ✅ Handle status updates
          if (value?.statuses) {
            const statuses = value.statuses || [];
            for (const status of statuses) {
              const meta_msg_id = status?.meta_msg_id;
              const newStatus = status?.status;

              if (meta_msg_id && newStatus) {
                const result = await Message.updateOne(
                  { meta_msg_id },
                  { $set: { status: newStatus } }
                );

                if (result.modifiedCount > 0) {
                  console.log(
                    `🔁 Updated status: ${newStatus} → ${meta_msg_id}`
                  );
                } else {
                  console.log(
                    `⚠️ No matching message for status update: ${meta_msg_id}`
                  );
                }
              }
            }
          }
        }
      }

      console.log(`✅ Processed file: ${file}`);
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
    }
  }

  mongoose.disconnect();
  process.exit();
};

processPayloads();
