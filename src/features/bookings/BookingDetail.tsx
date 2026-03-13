import styled from "styled-components";

import BookingDataBox from "./BookingDataBox.tsx";
import Row from "../../ui/Row.tsx";
import Heading from "../../ui/Heading.tsx";
import Tag from "../../ui/Tag.tsx";
import ButtonGroup from "../../ui/ButtonGroup.tsx";
import Button from "../../ui/Button.tsx";
import ButtonText from "../../ui/ButtonText.tsx";

import { useMoveBack } from "../../hooks/useMoveBack.ts";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const booking = {};
  const status = "checked-in";

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #X</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
