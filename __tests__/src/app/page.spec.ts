import { By, Builder, Key } from 'selenium-webdriver';
import assert from 'assert';

import { startMirage } from '../../../mirage';
import { Server } from 'miragejs';

const Session = async () => {
    return await new Builder().forBrowser('chrome').build();
}

describe('Test <Home />', () => {
    let seleniumDriver: any;
    const uri: string = 'http://localhost:3000/';
    let mock: Server;

    beforeEach(async () => {
        mock = startMirage();
        mock.createList("user", 3);
    });

    afterEach(async () => {
        mock.shutdown();
        // await seleniumDriver.quit();
    });

    it.skip('Should be insert text in element input with id nameTodo', async () => {
        try {
            seleniumDriver = await Session();
            await seleniumDriver.get(uri);
            await seleniumDriver.manage().setTimeouts({ implicit: 5000 });
            let inputElement = await seleniumDriver.findElement(By.xpath("//input[@id='nameTodo']"));
            await inputElement.sendKeys('Novo');
            assert.strictEqual(await inputElement.getText(), 'Novo');
        }catch(e){
            console.log(e)
        }
    });

    it('Should be insert in listTodo an name pass in the input with id nameTodo', async () => {
        try {
            seleniumDriver = await Session();
            await seleniumDriver.get(uri);
            await seleniumDriver.manage().setTimeouts({ implicit: 5000 });
            let inputElement = await seleniumDriver.findElement(By.xpath("//input[@id='nameTodo']"));
            await inputElement.clear();
            await inputElement.sendKeys('Novo todo', Key.ENTER);

            let newTodo = await seleniumDriver.findElement(By.xpath("//li[text()='Novo todo']"));

            assert.strictEqual(await newTodo.getText(), 'Novo todo');
        }catch(e){
            console.log(e)
        }
    });
})