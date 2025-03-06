package iuh.fit;

// Interface Product 1
interface Chair {
    void sitOn();
}

// Interface Product 2
interface Table {
    void use();
}

// Concrete Product 1A
class ModernChair implements Chair {
    public void sitOn() {
        System.out.println("Sitting on a modern chair.");
    }
}

// Concrete Product 1B
class VictorianChair implements Chair {
    public void sitOn() {
        System.out.println("Sitting on a Victorian chair.");
    }
}

// Concrete Product 2A
class ModernTable implements Table {
    public void use() {
        System.out.println("Using a modern table.");
    }
}

// Concrete Product 2B
class VictorianTable implements Table {
    public void use() {
        System.out.println("Using a Victorian table.");
    }
}

// Abstract Factory
interface FurnitureFactory {
    Chair createChair();
    Table createTable();
}

// Concrete Factory 1
class ModernFurnitureFactory implements FurnitureFactory {
    public Chair createChair() {
        return new ModernChair();
    }
    public Table createTable() {
        return new ModernTable();
    }
}

// Concrete Factory 2
class VictorianFurnitureFactory implements FurnitureFactory {
    public Chair createChair() {
        return new VictorianChair();
    }
    public Table createTable() {
        return new VictorianTable();
    }
}

public class AbstractFactory {
    public static void main(String[] args) {
        FurnitureFactory modernFactory = new ModernFurnitureFactory();
        Chair modernChair = modernFactory.createChair();
        Table modernTable = modernFactory.createTable();

        modernChair.sitOn();
        modernTable.use();

        FurnitureFactory victorianFactory = new VictorianFurnitureFactory();
        Chair victorianChair = victorianFactory.createChair();
        Table victorianTable = victorianFactory.createTable();

        victorianChair.sitOn();
        victorianTable.use();
    }
}

