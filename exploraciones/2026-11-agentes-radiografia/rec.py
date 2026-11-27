import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':1440,'height':900}, record_video_dir='/home/claude/xray/vid', record_video_size={'width':1440,'height':900})
        pg=await ctx.new_page(); errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.mouse.move(720,820)
        await pg.goto('file:///home/claude/xray/index.html'); await pg.wait_for_timeout(1500)
        path=[(120,560),(290,520),(300,600),(430,560),(574,520),(580,610),(720,560),(861,500),(861,600),(1000,560),(1136,510),(1130,600),(1300,560),(1390,520)]
        for x,y in path:
            await pg.mouse.move(x,y,steps=22); await pg.wait_for_timeout(900)
        await pg.mouse.move(720,820,steps=20); await pg.wait_for_timeout(1000)
        print(errs); await ctx.close(); await b.close()
asyncio.run(main())
