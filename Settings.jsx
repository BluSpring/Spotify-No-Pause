const { React } = require('powercord/webpack');
const { TextInput, SwitchItem } = require('powercord/components/settings');

module.exports = ({ getSetting, updateSetting, toggleSetting }) => (
    <div>
        <SwitchItem
            value={getSetting('noAutoPause', true)}
            required={true}
            onChange={() => toggleSetting('noAutoPause')}
        >Disable Spotify auto-pausing?</SwitchItem>
    </div>
)