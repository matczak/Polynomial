import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * Created by michn on 19.02.2016.
 */
public class PolynomialTest {

    private Polynomial polynomial;

    @Before
    public void setUp() throws Exception {
        polynomial = new Polynomial();
    }

    @Test
    public void whenPolynomialHasFirstAndLastArgument_polynomialIsNotPrime() throws Exception {
        assertFalse(polynomial.isPrime("x^3+1"));
    }

    @Test
    public void givenAllArgs_whenPolynomialHasFourthDegree_polynomialIsNotPrime() throws Exception {
        assertFalse(polynomial.isPrime("x^4+x^3+x^2+1"));
    }

    @Test
    public void givenFirstSecondAndFourthArg_whenPolynomialHasThirdDegree_polynomialIsPrime() throws Exception {
        assertTrue(polynomial.isPrime("x^3+x^1+1"));
    }

    @Test
    public void given1polynomialIsPrime() throws Exception {
        assertTrue(polynomial.isPrime("x^2+x^1+1"));
    }

    @Test
    public void given2polynomialIsPrime() throws Exception {
        assertTrue(polynomial.isPrime("x^3+x^1+1"));
    }

    @Test
    public void given3polynomialIsPrime() throws Exception {
        assertTrue(polynomial.isPrime("x^4+x^1+1"));
    }

    @Test
    public void given4polynomialIsPrime() throws Exception {
        assertTrue(polynomial.isPrime("x^5+x^2+1"));
    }

    @Test
    public void given5polynomialIsPrime() throws Exception {
        assertTrue(polynomial.isPrime("x^6+x^1+1"));
    }

    @Test
    public void given6polynomialIsPrime() throws Exception {
        assertTrue(polynomial.isPrime("x^7+x^3+1"));
    }

    @Test
    public void given7polynomialIsPrime() throws Exception {
        assertTrue(polynomial.isPrime("x^8+x^4+x^3+x^2+1"));
    }

    @Test
    public void given8polynomialIsPrime() throws Exception {
        assertTrue(polynomial.isPrime("x^9+x^4+1"));
    }

    @Test
    public void given9polynomialIsPrime() throws Exception {
        assertTrue(polynomial.isPrime("x^10+x^3+1"));
    }

    @Test
    public void given10polynomialIsPrime() throws Exception {
        assertTrue(polynomial.isPrime("x^9+x^4+1"));
    }
    @Test
    public void given11polynomialIsPrime() throws Exception {
        assertTrue(polynomial.isPrime("x^32+x^7+x^6+x^2+1"));
    }

}