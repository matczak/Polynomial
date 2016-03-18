import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Created by michn on 19.02.2016.
 */
public class Main {
    public static void main(String[] args) throws IOException {
        Polynomial polynomial = new Polynomial();
        int availableProcessors = Runtime.getRuntime().availableProcessors();
        System.setProperty("java.util.concurrent.ForkJoinPool.common.parallelism", String.valueOf(availableProcessors));

        long start = System.nanoTime();
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();

        Map<String, Boolean> result = Files.readAllLines(Paths.get(classloader.getResource("input.txt").getFile()))
                .parallelStream()
                .collect(Collectors.toMap(Function.identity(), polynomial::isPrime));

        System.out.printf("Obliczenia trwały %f milisekund\n", (System.nanoTime() - start) / 1e6);

        result.entrySet().stream().forEach(System.out::println);
    }
}
