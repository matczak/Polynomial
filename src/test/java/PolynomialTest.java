import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * Created by michn on 19.02.2016.
 */
public class PolynomialTest {

    private Polynomial Polynomial;

    @Before
    public void setUp() throws Exception {
        Polynomial = new Polynomial();
    }

    @Test
    public void whenPolynomialHasFirstAndLastArgument_polynomialIsNotPrime() throws Exception {
        assertFalse(Polynomial.isPrime("x^3+1"));
    }

    @Test
    public void givenAllArgs_whenPolynomialHasFourthDegree_polynomialIsNotPrime() throws Exception {
        assertFalse(Polynomial.isPrime("x^4+x^3+x^2+1"));
    }

    @Test
    public void givenFirstSecondAndFourthArg_whenPolynomialHasThirdDegree_polynomialIsPrime() throws Exception {
        assertTrue(Polynomial.isPrime("x^3+x^1+1"));
    }
}