# 원본 CRA 실행 환경 참고 사본

원본 진입점·Webpack 설정·빌드 스크립트와 package.json을 보관합니다. 실제 화면 컴포넌트와 스타일은 루트 `src/components`, `src/views`, `src/assets`에서 그대로 사용합니다.

현재 실행 진입점은 `src/classic/main.jsx`입니다. 실제 AWS 및 결제 SDK를 초기화하지 않으며, Lambda 참고 자료는 루트 `ETC/`에 있습니다.
