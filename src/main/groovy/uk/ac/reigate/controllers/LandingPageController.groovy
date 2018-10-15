package uk.ac.reigate.controllers

import org.apache.log4j.Logger
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class LandingPageController {
    
    protected static Logger LOGGER = Logger.getLogger(LandingPageController.class);

    private static final String DEFAULT_VIEW = "index"
        
//    @RequestMapping(["/", "/home"])
    public String showHomePage() {
        LOGGER.info("II Loading landing page");
    	return DEFAULT_VIEW;
    }
}