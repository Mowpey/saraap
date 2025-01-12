import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import "@/global.css";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SquareArrowOutUpRight } from "lucide-react";
import {
  updateProduct,
  addProduct,
  deleteProduct,
  updateProductStatus,
} from "@/services/products/crud_product";
import AddProductDialog from "@/services/products/add_dialog.tsx";
import EditProductDialog from "@/services/products/edit_dialog";
import DeleteProductDialog from "@/services/products/delete_dialog";
import { getProducts } from "@/services/products/crud_product";

type Product = {
  id: string;
  productName: string;
  category: string;
  price: number;
  status: boolean;
  img: string;
  storeId: string;  // Changed from storeName
};
const AdminTable = () => {
  const { storeId, storeName } = useLocalSearchParams<{ 
    storeId: string;
    storeName: string;
  }>();

  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  const handleStatusChange = async (id: string, checked: boolean) => {
    try {
      await updateProductStatus(id, checked);
      setProducts(
        products.map((item) =>
          item.id === id ? { ...item, status: checked } : item
        )
      );
    } catch (error) {
      console.error("Failed to update product status:", error);
    }
  };

  const fetchProducts = async (direction: "asc" | "desc") => {
    try {
      setIsLoading(true);
      // Modified to pass storeName to getProducts
      const productsData = await getProducts(storeId, direction);
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts(sortDirection);
  }, [sortDirection, storeId]);

  const handleEdit = (item: Product) => {
    setSelectedProduct(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: Product) => {
    setSelectedProduct(item);
    setIsDeleteDialogOpen(true);
  };

  const handleSortChange = (newDirection: string) => {
    setSortDirection(newDirection as "asc" | "desc");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{ padding: 20 }}>
          <div className="flex justify-between items-center mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Order By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={sortDirection}
                  onValueChange={handleSortChange}
                >
                  <DropdownMenuRadioItem value="asc">
                    Ascending
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="desc">
                    Descending
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="space-x-1">
              <Button
                className="w-12 p-2 text-xs"
                onClick={() => setIsAddDialogOpen(true)}
              >
                Add
              </Button>
            </div>
          </div>
          <AddProductDialog
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            onProductAdded={() => fetchProducts(sortDirection)}
            storeId={storeId}  // Pass storeId instead of storeName
            storeName={storeName}  // Pass storeName for display purposes
          />
          <EditProductDialog
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false);
              setSelectedProduct(null);
            }}
            onProductEdited={() => fetchProducts(sortDirection)}
            product={selectedProduct}
            storeId={storeId}  // Add storeId prop if needed in edit dialog
            storeName={storeName}  // Add storeName prop if needed in edit dialog
          />
<DeleteProductDialog
  isOpen={isDeleteDialogOpen}
  onClose={() => {
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  }}
  onProductDeleted={() => fetchProducts(sortDirection)}
  product={selectedProduct}
  storeName={storeName}
/>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[65px]">PRODUCT</TableHead>
                <TableHead className="text-center">CATEGORY</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead>IMAGE</TableHead>
                <TableHead className="text-center">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.productName}
                  </TableCell>
                  <TableCell className="text-center">{item.category}</TableCell>
                  <TableCell>₱{item.price.toFixed(0)}</TableCell>
                  <TableCell>
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.productName}
                        className="w-12 h-12 object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="w-12 p-2 text-xs"
                      onClick={() => handleEdit(item)} // Corrected to 'item'
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-12 p-2 text-xs font-bold"
                      onClick={() => handleDelete(item)} // Corrected to 'item'
                    >
                      Delete
                    </Button>
                    <Button asChild variant={"secondary"}>
                      {/* <Link href={item.actionUrl as string}>  */}
                      {/* <SquareArrowOutUpRight /> */}
                      {/* </Link> */}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AdminTable;
