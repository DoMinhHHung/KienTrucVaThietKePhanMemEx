package iuh.fit;

// Interface Product
interface Animal {
    void makeSound();
    void eat();
}

class Dog implements Animal {
    public void makeSound() {
        System.out.println("Gau Gau");
    }
    public void eat() {
        System.out.println("An xuong");
    }
}

class Cat implements Animal {
    public void makeSound() {
        System.out.println("Meo Meo");
    }
    public void eat() {
        System.out.print("An ca");
    }
}

// Factory Method
class AnimalFactory {
    public static Animal createAnimal(String type) {
        if (type.equalsIgnoreCase("dog")) {
            return new Dog();
        } else if (type.equalsIgnoreCase("cat")) {
            return new Cat();
        }
        return null;
    }
}

public class FactoryMethod {
    public static void main(String[] args) {
        Animal animal1 = AnimalFactory.createAnimal("dog");
        animal1.makeSound();

        Animal animal2 = AnimalFactory.createAnimal("cat");
        animal2.eat();
    }
}
