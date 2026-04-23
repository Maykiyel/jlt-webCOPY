import { Button, Group, Modal, Select, Text, UnstyledButton } from "@mantine/core";
import { CheckCircle } from "@nine-thirty-five/material-symbols-react/outlined";

type Reassignprops = {
    reassignModalOpen: boolean;
    setReassignModalOpen: (open: boolean) => void;
    selectedQuotation: any;
}

export default function ReassignModal({reassignModalOpen, setReassignModalOpen, selectedQuotation}: Reassignprops) {

    return (
        <Modal
        opened={reassignModalOpen}
        onClose={() => setReassignModalOpen(false)}
        title="REASSIGNMENT REQUEST"
        centered
        size={600}
        overlayProps={{ color: "#121f4a", opacity: 0.55 }}
        styles={{
          content: {
            borderRadius: "0.375rem",
            overflow: "hidden",
          },
          header: {
            background: "#e8e8e8",
            borderBottom: "1px solid #d7d7d7",
            minHeight: "3.125rem",
            padding: "0.75rem 1.5rem",
          },
          title: {
            color: "#16345b",
            fontSize: "1.75rem",
            fontWeight: 700,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          },
          close: {
            color: "#0f1427",
          },
          body: {
            padding: "1.5rem",
          },
        }}
      >
        <Group gap={6} align="flex-start" mb={4}>
          <Text c="#7b7b7b" fz="1rem" w={170}>Quotation Request Ref. No</Text>
          <Text c="#1e3049" fz="1rem" fw={600}>{selectedQuotation?.reference_number ?? "-"}</Text>
        </Group>
        <Group gap={6} align="flex-start" mb={4}>
          <Text c="#7b7b7b" fz="1rem" w={170}>From:</Text>
          <Text c="#1e3049" fz="1rem" fw={500}>
            {selectedQuotation?.account_specialist ?? selectedQuotation?.prepared_by ?? "-"}
          </Text>
        </Group>
        <Group gap={6} align="flex-start" mb={4}>
          <Text c="#7b7b7b" fz="1rem" w={170}>Reason :</Text>
          <Text c="#1e3049" fz="1rem" fw={500}>WORKLOAD</Text>
        </Group>
        <Text c="#7b7b7b" fz="1rem" mb={2}>Additional Details</Text>
        <Text c="#1e3049" fz="1rem" lh={1.4} mb="1rem">
          I have been assigned multiple urgent tasks recently and do not have sufficient
          time to create a quotation for this request.
        </Text>

        <Select
          mb="1.25rem"
          size="md"
          radius="sm"
          placeholder="Select handler"
        //   data={specialistOptions}
        //   value={selectedReassignAsId}
        //   onChange={setSelectedReassignAsId}
          searchable
          nothingFoundMessage="No handlers found"
        />

        <Group grow>
          <Button
            h={48}
            radius="md"
            leftSection={<CheckCircle width={18} />}
            styles={{
              root: {
                background: "#4a7f72",
                "&:hover": {
                  background: "#3f6d62",
                },
              },
            }}
            tt="uppercase"
            onClick={() => {
              // connect reassignment mutation here.
              setReassignModalOpen(false);
            }}
            // disabled={!selectedReassignAsId}
          >
            Reassign
          </Button>
          <Button
            h={48}
            radius="md"
            tt="uppercase"
            styles={{
              root: {
                background: "#b24955",
                "&:hover": {
                  background: "#9e3d48",
                },
              },
            }}
            onClick={() => setReassignModalOpen(false)}
          >
            Decline
          </Button>
        </Group>
      </Modal>
    )
}