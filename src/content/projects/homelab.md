---
title: "Homelab"
rank: 4
description: "A personal server, running from my apartment"
technologies: Docker, Linux, Cloudflare
image: "/homelab.webp"
---

When I started reaching the end of college, I realized that my cash flow was at a point where I needed to start making more careful financial decisions. I needed to have some way of tracking and keeping up with my goals. The problem is this: most budgeting software costs at least $100 a year (just for them to host 8kb worth of data at their servers and pay a small amount to Plaid for bank linking). At the time, this seemed like more of a cost than I was willing to bear--_after all, would budgeting my part-time college income really save me that much?_

#### Enter self-hosting. 


I found out about self-hosting through a couple online communities, and learned everything I could. I bought a Raspberry Pi 5 and flashed Raspberry PiOS lite, which is a simple, headless installation based on Debian Bookworm. I installed Portainer and CasaOS to make managing my apps and containers easy and GUI-based (if you've never used it before, the Docker CLI has a *bit* of a learning curve).

Before I knew it, I had 5-6 different apps running. I was using [Actual](https://github.com/actualbudget/actual) for budgeting, [Mealie](https://github.com/mealie-recipes/mealie) for recipes, [TimeTagger](https://github.com/almarklein/timetagger) for time tracking, and [Home Assistant](https://github.com/home-assistant/core) for a privacy-focused smart home setup to control my lights, espresso machine, and tv.

Of course, all of this runs over the local network. But I needed a way to access all of this from outside the home. So I spun up a simple Cloudflare tunnel, exposed to a cheap domain I bought for $10. The services Cloudflare provides are incredibly affordable and valuable for hobbyists. Not only do they provide free tunnels, but they also provide access to their world-class security features--all of my apps are behind a layer of Google authentication in addition to their default login.

All this to say, it's been an incredible journey, and I've saved countless dollars keeping everything in-house. I particarly love Home Assistant, which is the world's most extensible and customizable smart home platform. By running it on my Raspberry Pi instead of buying, say, an Apple Homepod, I'm keeping everything local and privacy-first. I can build automations as complex as I want, and control everything--including my cheap Android TV box--from my phone. 

If you're looking to save a little money, and maybe find a new project to tinker with, maybe consider a small homelab.