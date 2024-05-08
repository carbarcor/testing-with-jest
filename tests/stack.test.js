const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});

test('omfattande stack-operationer test', () => {
    // Initial rensning av stacken om nödvändigt
    while (stack.peek() !== undefined) {
        stack.pop();
    }

    // Test för push och peek
    stack.push('apple');
    expect(stack.peek()).toBe('apple');  // Kontrollerar att 'apple' är överst efter push

    stack.push('banana');
    expect(stack.peek()).toBe('banana');  // Kontrollerar att 'banana' nu är överst

    // Test för pop
    expect(stack.pop()).toBe('banana');  // Tar bort 'banana' och kontrollerar att det är korrekt
    expect(stack.peek()).toBe('apple');  // Kontrollerar att nu 'apple' är överst

    // Lägger till fler element
    stack.push('carrot');
    stack.push('date');

    // Kontrollerar ordning och beteende för pop
    expect(stack.pop()).toBe('datex');    // Tar bort 'datex' medvetet fel skrivit
    expect(stack.pop()).toBe('carroty');  // Tar bort 'carroty' medvetet fel skrivit
    expect(stack.pop()).toBe('applez');   // Tar bort 'applez' medvetet fel skrivit

    // Kontrollerar att stacken är tom
    expect(stack.peek()).toBeUndefined();
});