//noinspection JSUnusedGlobalSymbols
var API = {
    CHAT: 'chat',
    FRIEND_JOIN: 'friendJoin',
    USER_SKIP: 'userSkip',
    USER_JOIN: 'userJoin',
    USER_LEAVE: 'userLeave',
    VOTE_UPDATE: 'voteUpdate',
    GRAB_UPDATE: 'grabUpdate',
    SCORE_UPDATE: 'scoreUpdate',
    ADVANCE: 'advance',
    MOD_SKIP: 'modSkip',
    WAIT_LIST_UPDATE: 'waitListUpdate',
    CHAT_COMMAND: 'chatCommand',
    HISTORY_UPDATE: 'historyUpdate',
    ROLE: {
        NONE: 0,
        DJ: 1,
        BOUNCER: 2,
        MANAGER: 3,
        COHOST: 4,
        HOST: 5
    },
    STATUS: {
        AVAILABLE: 0,
        AWAY: 1,
        WORKING: 2,
        GAMING: 3
    },
    BAN: {
        HOUR: "h",
        DAY: "d",
        PERMA: "f"
    },
    MUTE: {
        SHORT: "s",
        MEDIUM: "m",
        LONG: "l"
    },
    enabled: true,
    _events: {},
    on: function(e, t, n) {
    },
    once: function(e, t, r) {
    },
    off: function(e, t, r) {
    },
    trigger: function(e) {
    },
    stopListening: function(e, t, r) {
    },
    listenTo: function(t, r, i) {
    },
    listenToOnce: function(t, r, i) {
    },
    bind: function(e, t, n) {
    },
    unbind: function(e, t, r) {
    },
    dispatch: function(t, n) {
    },
    sendChat: function(n) {
    },
    chatLog: function(t, n) {
    },
    djJoin: function() {
    },
    djLeave: function() {
    },
    getAdmins: function() {
    },
    getAmbassadors: function() {
    },
    getAudience: function() {
    },
    getBannedUsers: function() {
    },
    getDJ: function() {
    },
    getHistory: function() {
    },
    getHost: function() {
    },
    getMedia: function() {
    },
    getNextMedia: function() {
    },
    getScore: function() {
    },
    getStaff: function() {
    },
    getTimeElapsed: function() {
    },
    getTimeRemaining: function() {
    },
    getUser: function(r) {
    },
    getUsers: function() {
    },
    getWaitList: function() {
    },
    getWaitListPosition: function(i) {
    },
    hasPermission: function(r, i) {
    },
    moderateForceSkip: function() {
    },
    moderateAddDJ: function(t) {
    },
    moderateRemoveDJ: function(t) {
    },
    moderateBanUser: function(t, n, s) {
    },
    moderateUnbanUser: function(t) {
    },
    moderateDeleteChat: function(t) {
    },
    moderateSetRole: function(t, n) {
    },
    moderateLockWaitList: function(e, t) {
    },
    moderateMoveDJ: function(e, t) {
    },
    moderateMuteUser: function(t, n, s) {
    },
    moderateUnmuteUser: function(t) {
    },
    setStatus: function(e) {
    },
    setVolume: function(n) {
    },
    getVolume: function() {
    }
};