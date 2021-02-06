const { Plugin } = require('powercord/entities');
//const { inject, uninject } = require('powercord/injector');
const { getModule, spotify } = require('powercord/webpack');
const Settings = require('./Settings');

module.exports = class SpotifyNoPause extends Plugin {
    startPlugin () {
        powercord.api.settings.registerSettings('spotify-no-pause', {
            category: 'spotify-no-pause',
            label: 'Spotify Auto-Pause',
            render: Settings
        });
        this._patchAutoPause();
    }

    pluginWillUnload () {
        powercord.api.settings.unregisterSettings('spotify-no-pause');
        this._patchAutoPause(true);
    }

    async _patchAutoPause(revert) {
        if (this.settings.get('noAutoPause', true)) {
            const spotifyMdl = getModule([ 'initialize', 'wasAutoPaused' ], false);
            if (revert) {
                spotifyMdl.wasAutoPaused = spotifyMdl._wasAutoPaused;
                spotify.pause = spotify._pause;
            } else {
                spotifyMdl._wasAutoPaused = spotifyMdl.wasAutoPaused;
                spotifyMdl.wasAutoPaused = () => false;
                spotify._pause = spotify.pause;
                spotify.pause = () => void 0;
            }
        }
    }
};
