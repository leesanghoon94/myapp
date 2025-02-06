/** 
 * str.match로 검색하기
앞서 언급한 바와 같이 정규 표현식은 문자열 메서드와 조합하여 사용합니다
*/

let str = "Hello, World!";
console.log(str.match(/hello/gi));

console.log(str.match(/World/));

let matches = "JavaScript".match(/HTML/) || [];

if (!matches.length) {
  // TypeError: Cannot read property 'length' of null
  console.log("바로 윗줄에서 에러가 발생합니다.");
}

/**
 * str.replace로 치환하기
메서드 str.replace(regexp, replacement)를 사용하면 str 내 부분 문자열 중 regexp에 일치하는 부분 문자열을 replacement로 교체할 수 있습니다. 
이때 플래그 g가 있으면 모든 부분 문자열이 교체되고, 그렇지 않으면 첫 번째 부분 문자열만 교체됩니다.
 */
console.log("We will, we will".replace(/we/i, "I"));
console.log("We will, we will".replace(/we/gi, "I"));

/**
 * 특수 문자	교체 방식
$&	패턴과 일치하는 부분 문자열
$`	inserts a part of the string before the match
$'	inserts a part of the string after the match
$n	if n is a 1-2 digit number, then it inserts the contents of n-th parentheses, more about it in the chapter Capturing groups
$<name>	inserts the contents of the parentheses with the given name, more about it in the chapter Capturing groups
$$	inserts character $
 */
console.log("I love HTML".replace(/HTML/, "$& and JavaScript"));

/**
 * regexp.test로 일치 여부 확인하기
패턴과 일치하는 부분 문자열이 하나라도 있는 경우 메서드 regexp.test(str)을 호출하면 true가,
 그렇지 않으면 false가 반환됩니다.
 */
let str1 = "I love JavaScript";
let regexp = /LOVE/i;
console.log(regexp.test(str1));

/**
 * 요약
정규 표현식은 패턴과 선택적으로 사용할 수 있는 플래그 g, i, m, u, s, y로 구성됩니다.
플래그와 특수 기호(추후 학습)가 없는 경우엔 일반적인 부분 문자열 검색과 동일한 방식으로 검색이 진행됩니다.
플래그 g가 있는 경우엔 str.match(regexp)는 패턴과 일치하는 모든 부분 문자열을 검색합니다. g가 없는 경우엔 첫 번째 부분 문자열만 찾습니다.
str.replace(regexp, replacement)는 regexp과 일치하는 부분 문자열을 replacement로 교체합니다. g 플래그가 있으면 부분 문자열 전체를, 없으면 첫 번째 부분 문자열을 교체합니다.
패턴과 일치하는 부분 문자열이 하나라도 있는 경우 regexp.test(str)는 true를 반환합니다. 그렇지 않으면 false가 반환됩니다.


플래그
정규 표현식엔 검색에 영향을 주는 플래그를 선택적으로 붙일 수 있습니다.

자바스크립트는 6개의 플래그를 지원합니다.

i
i 플래그가 붙으면 대·소문자 구분 없이 검색합니다. 따라서 A와 a에 차이가 없습니다(아래 예시 참조).
g
g 플래그가 붙으면 패턴과 일치하는 모든 것들을 찾습니다. g 플래그가 없으면 패턴과 일치하는 첫 번째 결과만 반환됩니다.
m
다중 행 모드(multiline mode)를 활성화합니다. 자세한 내용은 앵커 ^와 $의 여러 행 모드, 'm' 플래그에서 다룰 예정입니다.
s
.이 개행 문자 \n도 포함하도록 ‘dotall’ 모드를 활성화합니다. 자세한 내용은 문자 클래스에서 다룰 예정입니다.
u
유니코드 전체를 지원합니다. 이 플래그를 사용하면 서로게이트 쌍(surrogate pair)을 올바르게 처리할 수 있습니다. 자세한 내용은 유니코드: 'u' 플래그와 \p{...} 클래스에서 다룰 예정입니다.
y
문자 내 특정 위치에서 검색을 진행하는 ‘sticky’ 모드를 활성화 시킵니다. 자세한 내용은 Sticky flag "y", searching at position에서 다룰 예정입니다.
 */
