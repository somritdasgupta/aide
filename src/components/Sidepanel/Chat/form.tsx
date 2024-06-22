import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import useDynamicTextareaSize from "~/hooks/useDynamicTextareaSize"
import { useMessage } from "~/hooks/useMessage"
import { toBase64 } from "~/libs/to-base64"
import {
  Checkbox,
  Dropdown,
  Image,
  Tooltip,
  Upload,
  Button,
  message
} from "antd"
import { useWebUI } from "~/store/webui"
import { defaultEmbeddingModelForRag } from "~/services/ollama"
import { ImageIcon, MicIcon, StopCircleIcon, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { ModelSelect } from "@/components/Common/ModelSelect"
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition"

type Props = {
  dropedFile: File | undefined
}

export const SidepanelForm = ({ dropedFile }: Props) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { sendWhenEnter, setSendWhenEnter } = useWebUI()
  const [typing, setTyping] = React.useState<boolean>(false)
  const { t } = useTranslation(["playground", "common"])

  const form = useForm({
    initialValues: {
      message: "",
      image: ""
    }
  })
  const {
    transcript,
    isListening,
    resetTranscript,
    start: startListening,
    stop: stopSpeechRecognition,
    supported: browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  const stopListening = async () => {
    if (isListening) {
      stopSpeechRecognition()
    }
  }

  const onInputChange = async (
    e: React.ChangeEvent<HTMLInputElement> | File
  ) => {
    if (e instanceof File) {
      const base64 = await toBase64(e)
      form.setFieldValue("image", base64)
    } else {
      if (e.target.files) {
        const base64 = await toBase64(e.target.files[0])
        form.setFieldValue("image", base64)
      }
    }
  }
  const textAreaFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Process" || e.key === "229") return
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !isSending &&
      sendWhenEnter &&
      !typing
    ) {
      e.preventDefault()
      form.onSubmit(async (value) => {
        await stopListening()
        if (value.message.trim().length === 0) {
          return
        }
        if (!selectedModel || selectedModel.length === 0) {
          form.setFieldError("message", t("formError.noModel"))
          return
        }
        if (chatMode === "rag") {
          const defaultEM = await defaultEmbeddingModelForRag()
          if (!defaultEM) {
            form.setFieldError("message", t("formError.noEmbeddingModel"))
            return
          }
        }
        form.reset()
        textAreaFocus()
        await sendMessage({
          image: value.image,
          message: value.message.trim()
        })
      })()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    if (e.clipboardData.files.length > 0) {
      onInputChange(e.clipboardData.files[0])
    }
  }

  const {
    onSubmit,
    selectedModel,
    chatMode,
    speechToTextLanguage,
    stopStreamingRequest,
    streaming,
    setChatMode
  } = useMessage()

  React.useEffect(() => {
    if (dropedFile) {
      onInputChange(dropedFile)
    }
  }, [dropedFile])

  useDynamicTextareaSize(textareaRef, form.values.message, 120)

  React.useEffect(() => {
    if (isListening) {
      form.setFieldValue("message", transcript)
    }
  }, [transcript])
  const { mutateAsync: sendMessage, isPending: isSending } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      textAreaFocus()
      message.success(t("form.success"))
    },
    onError: (error) => {
      textAreaFocus()
      message.error(t("form.error"))
    }
  })

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 border rounded-t-xl border-gray-200 dark:border-gray-600">
      {form.values.image && (
        <div className="relative mb-4">
          <Image
            src={form.values.image}
            alt="Uploaded"
            width={180}
            preview={false}
            className="rounded-md"
          />
          <button
            onClick={() => form.setFieldValue("image", "")}
            className="absolute top-0 right-0 m-2 bg-white dark:bg-gray-700 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      <div className="flex flex-col">
        <form
          onSubmit={form.onSubmit(async (value) => {
            if (!selectedModel || selectedModel.length === 0) {
              form.setFieldError("message", t("formError.noModel"))
              return
            }
            if (chatMode === "rag") {
              const defaultEM = await defaultEmbeddingModelForRag()
              if (!defaultEM) {
                form.setFieldError("message", t("formError.noEmbeddingModel"))
                return
              }
            }
            await stopListening()
            form.reset()
            textAreaFocus()
            await sendMessage({
              image: value.image,
              message: value.message.trim()
            })
          })}
          className="flex flex-col items-center w-full">
          <Upload.Dragger
            beforeUpload={(file) => {
              onInputChange(file)
              return false
            }}
            showUploadList={false}
            className="mb-4 w-full">
            <p className="ant-upload-drag-icon">
              <ImageIcon className="h-12 w-12" />
            </p>
            <p className="ant-upload-text">{t("form.dragAndDrop")}</p>
          </Upload.Dragger>
          <textarea
            onKeyDown={handleKeyDown}
            ref={textareaRef}
            className="px-2 py-2 w-full resize-none bg-transparent focus:outline-none border dark:border-gray-600 rounded-md"
            required
            onPaste={handlePaste}
            rows={1}
            style={{ minHeight: "60px" }}
            tabIndex={0}
            onCompositionStart={() => setTyping(true)}
            onCompositionEnd={() => setTyping(false)}
            placeholder={t("form.textarea.placeholder")}
            {...form.getInputProps("message")}
          />
          <div className="flex mt-4 justify-end gap-3 w-full">
            <ModelSelect />
            {browserSupportsSpeechRecognition && (
              <Tooltip title={t("tooltip.speechToText")}>
                <Button
                  type="text"
                  onClick={async () => {
                    if (isListening) {
                      stopListening()
                    } else {
                      resetTranscript()
                      startListening({
                        continuous: true,
                        lang: speechToTextLanguage
                      })
                    }
                  }}
                  icon={
                    !isListening ? (
                      <MicIcon className="h-5 w-5" />
                    ) : (
                      <div className="relative">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                        <MicIcon className="h-5 w-5" />
                      </div>
                    )
                  }
                />
              </Tooltip>
            )}
            <Tooltip title={t("tooltip.uploadImage")}>
              <Button
                type="text"
                onClick={() => inputRef.current?.click()}
                icon={<ImageIcon className="h-5 w-5" />}
                className={`${chatMode === "rag" ? "hidden" : "block"}`}
              />
            </Tooltip>
            {!streaming ? (
              <Dropdown.Button
                htmlType="submit"
                disabled={isSending}
                className="!justify-end"
                overlay={
                  <div>
                    <Checkbox
                      checked={sendWhenEnter}
                      onChange={(e) => setSendWhenEnter(e.target.checked)}>
                      {t("sendWhenEnter")}
                    </Checkbox>
                    <Checkbox
                      checked={chatMode === "rag"}
                      onChange={(e) =>
                        setChatMode(e.target.checked ? "rag" : "normal")
                      }>
                      {t("common:chatWithCurrentPage")}
                    </Checkbox>
                  </div>
                }>
                {t("common:submit")}
              </Dropdown.Button>
            ) : (
              <Tooltip title={t("tooltip.stopStreaming")}>
                <Button
                  type="text"
                  onClick={stopStreamingRequest}
                  icon={<StopCircleIcon className="h-6 w-6" />}
                />
              </Tooltip>
            )}
          </div>
        </form>
      </div>
      {form.errors.message && (
        <div className="text-red-500 text-center text-sm mt-1">
          {form.errors.message}
        </div>
      )}
    </div>
  )
}
