import { Suspense, useState } from "react";
import ErrorToast from "@components/ErrorToast/ErrorToast";
import Header from "@components/Header/Header";
import ProductList from "@components/ProductList/ProductList";
import { ErrorProvider } from "@context/ErrorContext";
import { Modal } from "soha-components";
import ModalInner from "@components/ModalInner/ModalInner";

import * as PLP from "./ProductListPage.style";

const Loading = () => {
  return <PLP.Loading>로딩중! 💪</PLP.Loading>;
};

const ProductListPage = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ErrorProvider>
      <PLP.Top>
        <Header handleOpenCartModal={() => setOpenModal(true)} />
        <ErrorToast />
      </PLP.Top>

      <PLP.Body>
        <Suspense fallback={<Loading />}>
          <ProductList />
        </Suspense>
      </PLP.Body>
      {openModal && (
        <Modal
          position="bottom"
          title="장바구니"
          closeModalClick={() => setOpenModal(false)}
          buttonText="닫기"
          buttonClick={() => setOpenModal(false)}
        >
          <ModalInner />
        </Modal>
      )}
    </ErrorProvider>
  );
};

export default ProductListPage;
