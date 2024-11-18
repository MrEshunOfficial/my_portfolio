import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { AppDispatch, RootState } from "@/store";
import { deleteContact, fetchContacts } from "@/store/contactSlice";
import moment from "moment";

const ContactList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, pagination, isLoading, error } = useSelector(
    (state: RootState) => state.contacts
  );

  const [deletePassword, setDeletePassword] = useState("");
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error]);

  const handleDeleteContact = () => {
    if (contactToDelete) {
      dispatch(
        deleteContact({
          contactId: contactToDelete,
          password: deletePassword,
        })
      ).then((result) => {
        if (deleteContact.fulfilled.match(result)) {
          toast({
            title: "Success",
            description: "Contact deleted successfully",
            variant: "default",
          });
          setContactToDelete(null);
          setDeletePassword("");
        }
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    dispatch(fetchContacts(newPage));
  };

  // Mobile card view for each contact
  const MobileContactCard = ({ contact }: { contact: any }) => {
    const isExpanded = expandedRow === contact._id;

    return (
      <div className="border-b p-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setExpandedRow(isExpanded ? null : contact._id)}
        >
          <div className="space-y-1">
            <h4 className="font-medium">{contact.name}</h4>
            <p className="text-sm text-gray-500">
              {moment(contact.createdAt).format("ll")}
            </p>
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Email:
              </label>
              <p className="text-sm mt-1">{contact.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Message:
              </label>
              <p className="text-sm mt-1">{contact.description}</p>
            </div>
            <div className="pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setContactToDelete(contact._id)}
                  >
                    <Trash2 className="mr-2" size={16} />
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>Enter admin password to delete this message:</p>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                    />
                    <Button variant="destructive" onClick={handleDeleteContact}>
                      Confirm Delete
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full p-0 border-none">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl">
          Contact Submissions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 border-none">
        {isLoading ? (
          <p className="w-full h-full p-4 flex items-center justify-center">
            Loading contacts...
          </p>
        ) : contacts.length === 0 ? (
          <p className="w-full h-full p-4 flex items-center justify-center">
            No contacts found.
          </p>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact._id}>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="max-w-[5rem] truncate block">
                              {contact.name}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Sender: {contact.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="max-w-[5rem] truncate block">
                              {contact.email}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Email: {contact.email}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="max-w-[6rem] truncate block">
                              {contact.description}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Message: {contact.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        {moment(contact.createdAt).format("ll")}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setContactToDelete(contact._id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Confirm Deletion</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>
                                Enter admin password to delete this message:
                              </p>
                              <Input
                                type="password"
                                placeholder="Enter password"
                                value={deletePassword}
                                onChange={(e) =>
                                  setDeletePassword(e.target.value)
                                }
                              />
                              <Button
                                variant="destructive"
                                onClick={handleDeleteContact}
                              >
                                Confirm Delete
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
              {contacts.map((contact) => (
                <MobileContactCard key={contact._id} contact={contact} />
              ))}
            </div>

            {/* Responsive Pagination */}
            <div className="p-4">
              <Pagination>
                <PaginationContent className="w-full flex items-center gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e: { preventDefault: () => void }) => {
                        e.preventDefault();
                        if (pagination.currentPage > 1) {
                          handlePageChange(pagination.currentPage - 1);
                        }
                      }}
                      className={
                        pagination.currentPage <= 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (pagination.currentPage < pagination.totalPages) {
                          handlePageChange(pagination.currentPage + 1);
                        }
                      }}
                      className={
                        pagination.currentPage >= pagination.totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactList;
