# KPoEM Interface

KPoEM Interface는 한국 근현대시를 대상으로 구축된 KPoEM(Korean Poetry Emotion Dataset) 데이터셋과 감정 분류 모델을 활용하여 시 텍스트를 시각적으로 탐색할 수 있도록 설계된 웹 기반 인터페이스이다.

본 프로젝트는 시의 감정을 분석하고 이를 다양한 시각화 방식으로 제공함으로써, 사용자가 문학 작품을 여러 관점에서 탐색할 수 있도록 구성되었다. 인터페이스는 크게 가까이 읽기(Close Reading), 멀리서 읽기(Distant Reading), 함께 읽기(Co-Reading)의 세 가지 모듈로 이루어진다.

* **Close Reading**은 개별 시 작품을 중심으로 감정 분석 결과를 탐색하는 기능이다.
* **Distant Reading**은 시인 및 작품 전체의 감정 분포와 패턴을 시각적으로 확인하는 기능이다.
* **Co-Reading(Lim, 2026 Forthcoming)**은 인간과 인공지능이 함께 문학 작품을 읽고 해석하는 실험적 읽기 환경으로, 감정 분석 결과를 색채와 시각적 요소로 변환하여 제시한다.

  For more information and source code, visit the project repository: 
  🔗 https://github.com/poet-developer/Co-Reading

단, 본 인터페이스는 학위논문의 논증과 개념 검증을 목적으로 개발된 정적(static) 웹 프로토타입으로, 실제 서비스 환경이나 사용자 상호작용을 전제로 한 시스템은 아니다. 따라서 현재 버전은 연구에서 제안하는 읽기 방식과 시각화 방법론의 가능성을 시연하기 위한 프로토타입 형태로 구성되어 있다.


## Project Structure

### backend

감정 분석과 시각화 결과를 생성하는 코드가 포함되어 있습니다.

- `shap/`
  - SHAP 기반 중요 단어 분석 결과 저장
- `KPoEM_heatmap.ipynb`
  - 감정 히트맵 생성
- `KPoEM_wordcloud.ipynb`
  - 워드클라우드 생성
- `poet_emotion_distribution.ipynb`
  - 시인별 감정 분포 분석
- `poet_SHAP_batched_run.ipynb`
  - SHAP 분석 수행

### frontend

사용자가 실제로 감정 분석 결과를 확인할 수 있는 웹 인터페이스입니다.

- `close_reading/`
  - 개별 시를 중심으로 감정을 탐색하는 화면
- `distant_reading/`
  - 시인 전체의 감정 경향을 확인하는 화면
- `co_reading/`
  -인간과 인공지능이 함께 시를 읽는 Co-Reading 인터페이스 사용자가 시를 선택하면 작품 전문이 표시됨 감정 분석 결과를 기반으로 감정–색채 시각화를 제공. 감정 정보를 색상 그라데이션과 범례 형태로 표현하여 새로운 시 읽기 경험을 제공.
  
- `source/`
  - 시인별 distant analysis HTML 결과 파일 저장
- `styles/`
  - CSS 스타일 파일
- `js/`
  - 인터페이스 동작을 위한 JavaScript 파일
- `img/`
  - 워드클라우드 이미지 파일 저장

## 주요 기능

* **Close Reading**

  * 개별 시 작품의 감정 분석 결과 탐색
  * 행 단위 감정 정보 및 주요 감정 확인

* **Distant Reading**

  * 시인별·작품별 감정 분포 시각화
  * 감정 히트맵을 통한 감정 패턴 탐색

* **Co-Reading**

  * 인간과 인공지능이 함께 시를 읽는 인터페이스 제공
  * 감정 분석 결과를 색채 시각화로 표현
  * 문학적 해석과 AI 분석 결과를 동시에 탐색 가능

* **Emotion Visualization**

  * 감정 히트맵(Heatmap) 제공
  * 감정 분포 시각화
  * 감정–색채 매핑(Color Mapping)

* **Explainable AI**

  * SHAP 기반 핵심 단어 분석
  * 워드클라우드를 통한 감정 특징어 시각화

* **Interactive Exploration**

  * 시인, 작품, 감정 정보를 웹 기반 환경에서 탐색
  * 다양한 읽기 방식을 결합한 디지털 인문학 인터페이스 제공


## 대상 시인

- 한용운
- 김소월
- 이상
- 임화
- 윤동주

## 목적

KPoEM Interface는 감정 데이터셋과 인공지능 분석 결과를 활용하여 한국 근현대시를 새로운 방식으로 읽고 탐색할 수 있는 디지털 인문학 연구 환경을 제공하는 것을 목표로 합니다.

## Resource

### 📖 KPoEM Dataset
- IRO LIM · Ji Haein · Koo Sul · Jung Song-yi · Yun Jonghoon · Byungjun Kim
- Repository: [Zenodo](https://zenodo.org/records/15598092), [HuggingFace](https://huggingface.co/datasets/AKS-DHLAB/KPoEM)

### 🤖 KPoEM Emotion Classification Model
- IRO LIM · Ji Haein · Byungjun Kim
- Repository: [HuggingFace](https://huggingface.co/AKS-DHLAB/KPoEM)

> ⬇️ 본 데이터셋과 감정 분류 모델은 공동연구를 통해 개발되었으며, 상세 내용은 아래 관련 논문을 참고하기 바란다.
>
> Lim, I., Ji, H., & Kim, B. (2026). KPoEM: A human-annotated dataset for emotion classification and RAG-based poetry generation in Korean modern poetry. The Review of Korean Studies, 29(1), 161–206. https://doi.org/10.25024/review.2026.29.1.161

---

### 🎨 KCoEM Dataset
- IRO LIM
- Repository: [Zenodo](https://zenodo.org/records/19464212)

### 🌈 Co-Reading
- IRO LIM
- Repository: [Github](https://github.com/poet-developer/Co-Reading)
