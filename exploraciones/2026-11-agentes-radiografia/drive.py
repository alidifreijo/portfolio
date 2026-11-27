import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':1440,'height':900})
        errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file:///home/claude/xray/index.html'); await pg.wait_for_timeout(1200)
        for i,(x,y) in enumerate([(290,540),(861,560),(1136,520)]):
            await pg.mouse.move(x,y,steps=12); await pg.wait_for_timeout(1500)
            await pg.screenshot(path=f'/home/claude/xray/h{i}.png')
        print(errs); await b.close()
asyncio.run(main())
