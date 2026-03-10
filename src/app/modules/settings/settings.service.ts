import { Settings } from './settings.model';
import { ITeamEmailSettings } from './settings.interface';

const getSettingsFromDB = async () => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  return settings;
};

const updateSettingsInDB = async (payload: Partial<ITeamEmailSettings>) => {
  const result = await Settings.findOneAndUpdate({}, payload, {
    new: true,
    upsert: true,
  });
  return result;
};

export const settingsService = {
  getSettingsFromDB,
  updateSettingsInDB,
};
