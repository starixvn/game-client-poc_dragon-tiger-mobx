if (process == null) {
  var process = {
    env: {
      NODE_ENV: "production",
    },
  };
}

(function () {
  var id = 0;
  Object.defineProperty(Object.prototype, "debugId", {
    get: function () {
      const key = "_debug_id";
      if (typeof this[key] == "undefined") {
        this[key] = ++id;
      }

      return this[key];
    },
  });
})();
