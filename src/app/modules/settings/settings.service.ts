import { Settings } from "./settings.model";
import { ITeamEmailSettings } from "./settings.interface";

const getSettingsFromDB = async () => {
  // Always return the first (and only) settings document
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({}); // Create default if empty
  }
  return settings;
};

const updateSettingsInDB = async (payload: Partial<ITeamEmailSettings>) => {
  const result = await Settings.findOneAndUpdate(
    {}, // Empty filter finds the first doc
    payload,
    { new: true, upsert: true }
  );
  return result;
};

export const settingsService = {
  getSettingsFromDB,
  updateSettingsInDB,
};