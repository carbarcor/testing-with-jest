const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
	let stack = await driver.findElement(By.id('top_of_stack')).getText();
	expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
	it('should open a prompt box', async () => {
		let push = await driver.findElement(By.id('push'));
		await push.click();
		let alert = await driver.switchTo().alert();
		await alert.sendKeys("Bananer");
		await alert.accept();
	});
});

describe('Testing multiple pushes and peek functionality', () => {
    test('The top of stack should reflect the last pushed item', async () => {
        // Lägg till element i stacken
        const itemsToAdd = ['Bananer', 'Äpplen', 'Päron']; 
        for (let item of itemsToAdd) {
            let pushButton = await driver.findElement(By.id('push')); 
            await pushButton.click();
            let alert = await driver.switchTo().alert();
            await alert.sendKeys(item);
            await alert.accept();
        }

        // Kontrollera att det översta elementet på stacken är det senast tillagda
        let topOfStack = await driver.findElement(By.id('top_of_stack')).getText();
        expect(topOfStack).toEqual(itemsToAdd[itemsToAdd.length - 1]);  // Päron
    });
});