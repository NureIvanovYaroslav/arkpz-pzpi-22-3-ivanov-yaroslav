//Форматування
//Поганий приклад
fun calculateSum(firstNumber:Int,secondNumber:Int):Int
{
var result=firstNumber+secondNumber
return result
}
fun createUser(name: String, age: Int, email: String) {}
fun main()
{
val res=calculateSum(10,20)
println("Result is "+res)
val user = createUser("yaroslav",19,"yaroslav.ivanov@nure.ua")
}
//Гарний приклад
fun calculateSum(firstNumber: Int, secondNumber: Int): Int {
    val result = firstNumber + secondNumber
    return result
}

fun createUser(
    name: String,
    age: Int,
    email: String,
) {}

fun main() {
    val result = calculateSum(10, 20)
    println("Result is $result")

    val user = createUser(
        "yaroslav",
        19,
        "yaroslav.ivanov@nure.ua"
    )
}

//Конвенції найменування
//Поганий приклад
package Project

class userprofile {
    val username = "Yaroslav05"
    fun getusername(): String {
        return username
    }
}

fun main() {
    val UserName = userprofile().getusername()
    println("Username: $UserName")
}
//Гарний приклад
package project

class UserProfile {
    val USERNAME = "Yaroslav05"
    fun getUsername(): String {
        return USERNAME
    }
}

fun main() {
    val userName = UserProfile().getUsername()
    println("Username: $userName")
}

//Найменування
//Поганий приклад
class MyUtils {
    fun doStuff(a: Int, b: Int): Int {
        return a + b
    }
}

fun main() {
    val obj = MyUtils()
    val result = obj.doStuff(5, 10)
    println("Result is $result")
}
//Гарний приклад
class MathOperations {
    fun addNumbers(firstNumber: Int, secondNumber: Int): Int {
        return firstNumber + secondNumber
    }
}

fun main() {
    val mathOperations = MathOperations()
    val result = mathOperations.addNumbers(5, 10)
    println("Result is $result")
}

//Коментування
//Поганий приклад
// Клас для роботи з продуктами
class Product(val name: String, val price: Double)

fun calculateTotalPrice(products: List<Product>): Double {
    // Обчислюємо загальну ціну
    var total = 0.0
    // Перебираємо всі продукти
    for (product in products) {
        // Додаємо ціну продукту до загальної
        total += product.price
    }
    // Повертаємо загальну ціну
    return total
}

fun main() {
    // Створюємо список продуктів
    val products = listOf(
        Product("Apple", 1.0),
        Product("Banana", 0.5),
        Product("Orange", 0.75)
    )
    // Обчислюємо загальну ціну продуктів
    val totalPrice = calculateTotalPrice(products)
    // Виводимо загальну ціну продуктів
    println("Total price: $totalPrice")
}
//Гарний приклад
// Клас, що представляє продукт з іменем і ціною
class Product(val name: String, val price: Double)

// Обчислює загальну ціну всіх продуктів зі списку.
fun calculateTotalPrice(products: List<Product>): Double {
    var total = 0.0

    for (product in products) {
        total += product.price
    }

    return total
}

// Основна функція для демонстрації обчислення загальної ціни продуктів.
fun main() {
    val products = listOf(
        Product("Apple", 1.0),
        Product("Banana", 0.5),
        Product("Orange", 0.75)
    )

    val totalPrice = calculateTotalPrice(products)
    println("Total price: $totalPrice")
}

//Документування
//Поганий приклад
// Клас для управління обліковими записами користувачів
class UserAccountManager {
    // Додає нового користувача
    fun addUser(name: String, age: Int) {
        // Реєструємо користувача з іменем та віком
        println("User $name, $age years old, added.")
    }

    // Виводить інформацію про користувача
    fun printUserInfo(name: String) {
        // Виводимо ім'я користувача
        println("User name: $name")
    }
}

fun main() {
    val manager = UserAccountManager()
    manager.addUser("Yaroslav", 19)
    manager.printUserInfo("Yaroslav")
}
//Гарний приклад
/**
 * Клас для управління обліковими записами користувачів.
 */
class UserAccountManager {

    /**
     * Додає нового користувача.
     *
     * @param name ім'я користувача
     * @param age вік користувача
     * @throws IllegalArgumentException якщо вік користувача менше 0
     */
    fun addUser(name: String, age: Int) {
        if (age < 0) {
            throw IllegalArgumentException("Вік не може бути менше 0")
        }
        println("User $name, $age years old, added.")
    }

    /**
     * Виводить інформацію про користувача.
     *
     * @param name ім'я користувача
     */
    fun printUserInfo(name: String) {
        println("User name: $name")
    }
}

/**
 * Основна функція для демонстрації використання UserAccountManager.
 */
fun main() {
    val manager = UserAccountManager()
    manager.addUser("Yaroslav", 19)
    manager.printUserInfo("Yaroslav")
}

//Розширення функцій
//Поганий приклад
class StringUtils {
    fun isPalindrome(str: String): Boolean {
        val reversed = str.reversed()
        return str == reversed
    }
}

fun main() {
    val stringUtils = StringUtils()
    val result = stringUtils.isPalindrome("level")
    println("Is 'level' a palindrome? $result")
}
//Гарний приклад
fun String.isPalindrome(): Boolean {
    val reversed = this.reversed()
    return this == reversed
}

fun main() {
    val result = "level".isPalindrome()
    println("Is 'level' a palindrome? $result")
}

//Типова безпека
//Поганий приклад
fun printUserDetails(user: User?) {
    val username = user.username
    println("Username: $username")
}

fun main() {
    val user: User? = null
    printUserDetails(user)
}

data class User(val username: String?)
//Гарний приклад
fun printUserDetails(user: User?) {
    val username = user?.username ?: "Guest"
    println("Username: $username")
}

fun main() {
    val user: User? = null
    printUserDetails(user)
}

data class User(val username: String?)

//Дата класи
//Поганий приклад
class User(val name: String, val age: Int) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is User) return false

        if (name != other.name) return false
        if (age != other.age) return false

        return true
    }

    override fun hashCode(): Int {
        var result = name.hashCode()
        result = 31 * result + age
        return result
    }

    override fun toString(): String {
        return "User(name='$name', age=$age)"
    }
}

fun main() {
    val user1 = User("Yaroslav", 19)
    val user2 = User("Yaroslav", 20)

    println(user1 == user2)
    println(user1)
}
//Гарний приклад
data class User(val name: String, val age: Int)

fun main() {
    val user1 = User("Yaroslav", 19)
    val user2 = User("Yaroslav", 20)

    println(user1 == user2)
    println(user1)
}