/* 学習のきろく（スタンプ・学習済み・お気に入り・作り方のステップ）
   localStorage にまとめて保存する。使えない環境（プライベートブラウズなど）でも壊れないよう、
   読み書きは必ず try/catch で囲み、失敗したらメモリ上だけで動く。 */
(function () {
  "use strict";

  var KEY = "mcl-progress-v1";
  var EMPTY = function () {
    return { stamps: {}, learned: [], favorites: [], steps: {}, prefs: {} };
  };
  var memory = null; // 保存できないときの控え

  function load() {
    var data = null;
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) data = JSON.parse(raw);
    } catch (e) {
      data = null;
    }
    if (!data || typeof data !== "object") data = memory || EMPTY();
    var base = EMPTY();
    Object.keys(base).forEach(function (k) {
      if (data[k] === undefined || data[k] === null) data[k] = base[k];
    });
    return data;
  }

  function save(data) {
    memory = data;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function today() {
    var d = new Date();
    var p = function (n) { return (n < 10 ? "0" : "") + n; };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  window.Progress = {
    get: load,
    hasStamp: function (levelId) {
      return Boolean(load().stamps[String(levelId)]);
    },
    addStamp: function (levelId) {
      var d = load();
      if (!d.stamps[String(levelId)]) d.stamps[String(levelId)] = today();
      return save(d);
    },
    removeStamp: function (levelId) {
      var d = load();
      delete d.stamps[String(levelId)];
      return save(d);
    },
    getStep: function (pageKey) {
      var n = load().steps[pageKey];
      return typeof n === "number" ? n : 0;
    },
    setStep: function (pageKey, n) {
      var d = load();
      d.steps[pageKey] = n;
      return save(d);
    },
    getPref: function (name, fallback) {
      var v = load().prefs[name];
      return v === undefined ? fallback : v;
    },
    setPref: function (name, value) {
      var d = load();
      d.prefs[name] = value;
      return save(d);
    },
    clearStamps: function () {
      var d = load();
      d.stamps = {};
      return save(d);
    },
    toggleList: function (listName, id) {
      var d = load();
      var list = d[listName] || [];
      var i = list.indexOf(id);
      if (i >= 0) list.splice(i, 1); else list.push(id);
      d[listName] = list;
      save(d);
      return i < 0;
    },
    inList: function (listName, id) {
      return (load()[listName] || []).indexOf(id) >= 0;
    },
    /* つぎに やるレベル（スタンプがない いちばん小さいレベル） */
    nextLevel: function (levels) {
      for (var i = 0; i < levels.length; i++) {
        if (!this.hasStamp(levels[i].id)) return levels[i].id;
      }
      return null;
    }
  };
})();
