# Crawler for Tracy - Browser Extension

> A Browser Extension (primarily Google Chrome and Chromium for now) to augment your normal Bug Bounty / Pentesting day to day Recon Workflow. As you browse, it submits configurable payloads to each text area and text input field it finds on a page. As it submits these, it sends a message to the companion extension Tracy, which tracks the payloads and monitors them for whenever they appear back anywhere in the DOM, which is a potential for XSS.It will have three modes of operation, passive, active and idle.

## Passive Mode

Crawler monitors the page(s) you are on and waits for you to be done interacting with the page before it starts filling out payloads, so you don't get blocked while signing in or manually mapping out the application. In that case you may want to consider putting it into idle mode. 

## Active Mode

Crawler begins spidering the page you have open in the web browser, mimicking a real user by collecting clickable nodes from the dom via the MutationObserver, and systematically via one of the strategies. 

## Idle Mode

Crawler does not actively submit payloads or crawl, but it builds up its queue of hosts to visit and input fields to fill in on each page you visit

Features (Coming Soon to a Web Browser near you)

* Doesn't visit urls multiple times (nice to servers)
* Allows you to export urls and parameters its found
* Configurable In / Out scope for Crawling and Input submitting
