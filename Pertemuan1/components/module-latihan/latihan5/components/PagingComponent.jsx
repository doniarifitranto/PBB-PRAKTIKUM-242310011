import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { color_list } from "../styles/StyleApps";

export default function PagingComponent({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  maxPageItems = 5,
}) {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    if (totalPages <= maxPageItems) {
      // Jika total pages kurang dari atau sama dengan maxPageItems, tampilkan semua
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem
            key={i}
            active={i === currentPage}
            onClick={() => onPageChange(i)}
            number={i}
            currentPage={currentPage}
          />,
        );
      }
    } else {
      // Logika sliding window untuk banyak pages
      let startPage = Math.max(1, currentPage - Math.floor(maxPageItems / 2));
      let endPage = Math.min(totalPages, startPage + maxPageItems - 1);

      // Adjust startPage jika endPage sudah mentok di akhir
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPageItems + 1);
      }

      // Tampilkan halaman pertama jika tidak termasuk dalam range
      if (startPage > 1) {
        pages.push(
          <PaginationItem
            key={1}
            active={1 === currentPage}
            onClick={() => onPageChange(1)}
            number={1}
            currentPage={currentPage}
          />,
        );

        // Tambahkan ellipsis jika ada gap
        if (startPage > 2) {
          pages.push(
            <PaginationItem
              key="ellipsis-start"
              disabled={true}
              number="..."
              currentPage={currentPage}
            />,
          );
        }
      }

      // Tampilkan range pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PaginationItem
            key={i}
            active={i === currentPage}
            onClick={() => onPageChange(i)}
            number={i}
            currentPage={currentPage}
          />,
        );
      }

      // Tampilkan halaman terakhir jika tidak termasuk dalam range
      if (endPage < totalPages) {
        // Tambahkan ellipsis jika ada gap
        if (endPage < totalPages - 1) {
          pages.push(
            <PaginationItem
              key="ellipsis-end"
              disabled={true}
              number="..."
              currentPage={currentPage}
            />,
          );
        }

        pages.push(
          <PaginationItem
            key={totalPages}
            active={totalPages === currentPage}
            onClick={() => onPageChange(totalPages)}
            number={totalPages}
            currentPage={currentPage}
          />,
        );
      }
    }

    return pages;
    // eslint-disable-next-line
  }, [totalPages, currentPage, maxPageItems]);

  return (
    <View>
      <View style={paginationStyles.paginationContainer}>
        {currentPage !== 1 && (
          <>
            <PaginationItem
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              number="<<"
              currentPage={currentPage}
            />
            <PaginationItem
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              number="<"
              currentPage={currentPage}
            />
          </>
        )}
        {paginationItems}
        {currentPage !== totalPages && (
          <>
            <PaginationItem
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              number=">"
              currentPage={currentPage}
            />
            <PaginationItem
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              number=">>"
              currentPage={currentPage}
            />
          </>
        )}
      </View>
    </View>
  );
}

const PaginationItem = ({
  active = false,
  onClick,
  number,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        paginationStyles.pageButton,
        active && paginationStyles.activePageButton,
        disabled && paginationStyles.disabledButton,
      ]}
      onPress={onClick}
      disabled={disabled}
    >
      <Text
        style={[
          paginationStyles.pageButtonText,
          active && paginationStyles.activePageButtonText,
          disabled && paginationStyles.disabledText,
        ]}
      >
        {number}
      </Text>
    </TouchableOpacity>
  );
};

const paginationStyles = StyleSheet.create({
  infoContainer: {
    padding: 16,
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginVertical: 2,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 8,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: color_list.green || "#007AFF",
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  navButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
  disabledText: {
    color: "#999",
  },
  pageNumbersContainer: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    justifyContent: "center",
    flex: 1,
  },
  pageButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  activePageButton: {
    backgroundColor: color_list.green || "#007AFF",
    borderColor: color_list.green || "#007AFF",
  },
  pageButtonText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  activePageButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  ellipsis: {
    fontSize: 16,
    color: "#666",
    paddingHorizontal: 4,
    alignSelf: "center",
  },
});