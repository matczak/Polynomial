import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

import static java.util.stream.Collectors.toList;

/**
 * Created by michn on 19.02.2016.
 */
public class Polynomial {
    private static final Pattern splitter = Pattern.compile("\\+");

    public boolean isPrime(String polynomial) {
        polynomial = polynomial
                .trim()
                .substring(0, polynomial.length() - 2);

        List<Integer> argList = splitter.splitAsStream(polynomial)
                .map(arg -> Integer.valueOf(arg.replace("x^", "")))
                .collect(toList());

        Integer degree = argList.get(0);
        boolean[][] matrix = resolveMatrix(degree, argList);
        boolean[] previousResult = new boolean[degree];
        previousResult[0] = true;
        Set<Integer> elements = new HashSet<>();
        int totalResults = (int) Math.pow(2, degree) - 1;

        while (elements.size() < totalResults) {

            int value = arrayToInt(previousResult);
            if (elements.contains(value))
                return false;

            elements.add(value);
            previousResult = multiplyMatrixByVector(matrix, previousResult);
        }

        return true;
    }

    private int arrayToInt(boolean[] bytes) {
        int n = 0, l = bytes.length;
        for (int i = l-1; i >= 0; --i) {
            n = (n << 1) + (bytes[i] ? 1 : 0);
        }
        return n;
    }

    public boolean[] multiplyMatrixByVector(boolean[][] matrix, boolean[] vector) {
        int length = vector.length;
        boolean[] result = new boolean[length];
        Arrays.fill(result,false);

        for (int i = 0; i < length; ++i) {
            for (int j = 0; j < length; ++j) {
                /*
                suma % 2

                0 + 0 -> 0
                0 + 1 -> 1
                1 + 1 -> 0
                */
                result[i] = result[i] ^ (vector[j] && matrix[i][j]);
            }
        }

        return result;
    }

    private boolean[][] resolveMatrix(Integer degree, List<Integer> argList) {
        boolean[][] matrix = new boolean[degree][degree];
        for (int i = 1; i < degree; ++i)
            matrix[i][i - 1] = true;

        argList.stream().forEach(arg -> matrix[0][arg - 1] = true);
        return matrix;
    }
}
