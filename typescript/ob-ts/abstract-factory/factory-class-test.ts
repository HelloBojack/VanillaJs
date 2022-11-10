import LoggerFactory from "./factory-class";

const logger = LoggerFactory.createLogger();

logger.debug("debug");
logger.info("info");
logger.warn("warn");
logger.error("error");
