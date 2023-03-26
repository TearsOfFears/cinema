module.exports = {
  Schemas: {
    MANAGEMENT_MAIN: "user",
    BOOKING: "booking",
    SHOW: "show",
    PROFILES: "profiles",
    MOVIE: "movie",
    CINEMA_HALL: "cinema-hall",
    CINEMA: "cinema",
  },
  STATES: {
    ACTIVE: "active",
    CLOSED: "closed",
    PASSIVE: "passive",
  },
  ERRORS_CODES: {
    DUPLICATE: "SequelizeUniqueConstraintError",
  },
};
